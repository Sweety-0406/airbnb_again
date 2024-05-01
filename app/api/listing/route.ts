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
        images,
        videos,
        title,
        description

    } = body;
    console.log(body)

    const listing = await prisma.listing.create({
        data:{
            guestCount,
            roomCount,
            bathroomCount,
            price : parseInt(price,10),
            locationValue:location.value,
            category,
            title,
            description ,
            userId :currentUser.id,
            images:{ 
                createMany: {
                    data: images.map((image: { url: string }) => ({ url: image.url })), 
                }
            },
            videos: videos && videos.length > 0 ? {
                createMany: {
                    data: videos.map((video: { url: string }) => ({ url: video.url })),
                }
            } : undefined, 
        }
    })

    return NextResponse.json(listing);
}