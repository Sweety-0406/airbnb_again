import getCurrentUser from '@/app/action/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams{
    listingId?:string
}
export async function POST(
    request:Request,
    {params}:{params:IParams}
) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {listingId} = params;
    if(!listingId || typeof listingId != 'string'){
        return new Error('Invalid listing.')
    }

    const favoriteIds = [...(currentUser.favoriteIds || []) ];
    favoriteIds.push(listingId);

    const User = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(User)
}


export async function DELETE(
    request : Request,
    {params}:{params:IParams}
) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error()
    }
    const {listingId} = params;
    if(!listingId || typeof listingId !== 'string'){
        throw new Error();
    } 
    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((favoriteId)=>favoriteId != listingId)
    const User = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(User)

}