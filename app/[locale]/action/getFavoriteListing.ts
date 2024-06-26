import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'


export default async function getFavoriteListing(){
    try {
        const currentUser = await getCurrentUser()
        if(!currentUser){
            return [];
        }
    
        const favorites = await prisma?.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser.favoriteIds || [])]
                }
            },
            include:{
                images: true,
                videos: true
            }
        })
    

        const SafeFavorites = favorites.map((favorite)=>({
            ...favorite,
            createdAt : favorite.createdAt.toISOString()
        }))
    
        return SafeFavorites
    } catch (error:any) {
        throw new Error(error)
    }
}