import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import  prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/[locale]/action/getCurrentUser";

const corsHeaders = {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type, Authorization",
    
}

export async function OPTIONS() {
    return NextResponse.json({},{headers:corsHeaders})
}

export async function POST(
    req:Request
) {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error();
    }
    const body = await req.json();
    const{
        listingId,
        startDate,
        endDate,
        totalPrice,
        pathname
    } = body;

    if(!listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error();
    }

    const ListingAndReservation = await prisma.listing.update({
        where:{
            id: listingId
        },
        data:{
            reservations:{
                create:{
                    userId:currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        },
        include:{
            reservations: true
        }
    })
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    line_items.push({
        quantity:1,
        price_data: {
            currency: 'USD',
            product_data: {
                name:ListingAndReservation.title,
                description: ListingAndReservation.description
            },
            unit_amount: totalPrice*100
        }
    })



    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:"payment",
        billing_address_collection:"required",
        phone_number_collection:{
            enabled: true
        },
        success_url: `${pathname}/trips?success=1`,
        cancel_url: `${pathname}/trips?canceled=1`,
        metadata:{
            reservedId: ListingAndReservation.reservations[ListingAndReservation.reservations.length - 1].id
        }
    })

    return NextResponse.json({url: session.url}, {
        headers: corsHeaders
    })
}