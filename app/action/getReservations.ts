import  Prisma  from "@/app/libs/prismadb";

interface IParams{
    authorId?:string,
    userId?:string,
    listingId?:string
}
export default async function getReservation(params:IParams) {
    try {
        const{authorId,listingId,userId} = params;
        const query:any = {}
        if(listingId){
            query.listingId = listingId
        }
        if(userId){
            query.userId = userId
        }
        if(authorId){
            query.listing = {userId:authorId}
        }

        const reservations = await prisma?.reservation.findMany({
             where:query,
             include:{
                listing:true
             },
             orderBy:{
                createdAt:'desc'
             }
        })
        const safeReservation = reservations?.map((reservation)=>({
            ...reservations,
            createdAt:reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing:{
             ...reservation.listing,
             createdAt:reservation.listing.createdAt.toISOString()
            }
        }))
    } catch (error:any) {
        throw new Error(error);
    }
    
}