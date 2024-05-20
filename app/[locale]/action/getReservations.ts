import  prisma  from "@/app/libs/prismadb";

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

        console.log(query)

        const reservations = await prisma.reservation.findMany({
            where:query,
            include:{
            listing:{
                include:{
                    images: true,
                    videos: true
                } 
            } ,
            
            },
            orderBy:{
            createdAt:'desc'
            }
        })
        const safeReservation = reservations.map((reservation)=>({
            ...reservation,
            createdAt:reservation.createdAt.toISOString(),
            startDate:reservation.startDate.toISOString(),
            endDate:reservation.endDate.toISOString(),
            listing:{
                ...reservation.listing,
                createdAt:reservation.listing.createdAt.toISOString(),
            }
        }))

        console.log(safeReservation);
        return safeReservation;
    } catch (error:any) {
        throw new Error(error);
    }
    
}

