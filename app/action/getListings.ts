import prisma from '@/app/libs/prismadb'

export interface IListingParams{
  userId?: string,
  roomCount?:string;
  bathroomCount?:string;
  guestCount?:string;
  startDate?:string;
  endDate?:string;
  locationValue?:string;
  category?:string;
  page?:string;

}

var itemCount =0

export default async function getListings(params : IListingParams) {
   try {
    const {
      userId,
      roomCount,
      bathroomCount,
      guestCount,
      startDate,
      endDate,
      locationValue,
      category
    } = params;

    let page:number = 1
    if(params.page){
      page = parseInt(params.page,10)
    }
    const perPage:number = 12
    let query:any = {}

    if(userId){
      query.userId = userId
    }

      if(category){
        query.category=category;
      }

      if(locationValue){
        query.locationValue = locationValue;
      }

      if(roomCount){
        query.roomCount ={
          gte : +roomCount
        }
      }

      if(bathroomCount){
        query.bathroomCount ={
          gte : +bathroomCount
        }
      }

      if(guestCount){
        query.guestCount ={
          gte : +guestCount
        }
      }

      if(startDate && endDate){
        query.NOT = {
          reservations : {
            some :{
              OR:[
                {
                  endDate:{gte:startDate},
                  startDate:{lte:startDate}
                },
                {
                  startDate:{lte:endDate},
                  endDate:{gte:endDate}
                }
              ]
            }
          }
        }
      }

    const listing = await prisma.listing.findMany({
      where:query,
        include:{
          images: true,
          videos: true
        },
        orderBy:{
            createdAt:'desc'
        },
        skip:(perPage * (page-1)),
        take:perPage
    }) 

     itemCount = await prisma.listing.count({})

    const safeListing = listing.map((listing)=>({
       ...listing,
       createdAt:listing.createdAt.toISOString()
    }))
    return safeListing    
   } catch (error:any) {
     throw new Error(error)
   }
}

export {itemCount}
