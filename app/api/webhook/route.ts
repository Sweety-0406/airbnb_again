import Stripe from "stripe";
import {headers} from "next/headers"
import { NextResponse } from "next/server";
import  prisma from '@/app/libs/prismadb';
import {stripe} from "@/lib/stripe"

export async function POST(
    req:Request
) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error:any) {
        return new NextResponse( `webhook-error: ${error.message}`)
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.country,
        address?.postal_code,
    ]

    var order :any;
    const addressString = addressComponents.filter((c)=> c !== null).join(',')
    if(event.type === "checkout.session.completed"){
         order = await prisma.reservation.update({
            where:{
                id:session?.metadata?.reservedId
            },
            data:{
                isPaid:true,
                address: addressString,
                phone: session?.customer_details?.phone || ''
            }
        });

    }

    return new NextResponse(null,{status:200})
}