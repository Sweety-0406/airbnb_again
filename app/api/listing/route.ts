import getCurrentUser from '@/app/action/getCurrentUser';
import  prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(resquest : Request) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const body = await resquest.json();
    const{
        guestCount,
        roomCount,
        bathroomCount,
        price,
        location,
        category,
        imageSrc,
        title,
        description

    } = body;

    const listing = await prisma.listing.create({
        data:{
            guestCount,
            roomCount,
            bathroomCount,
            price : parseInt(price,10),
            locationValue:location.value,
            category,
            imageSrc,
            title,
            description ,
            userId :currentUser.id
        }
    })

    return NextResponse.json(listing);
}