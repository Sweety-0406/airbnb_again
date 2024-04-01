import ClientOnly from "@/app/Component/ClientOnly";
import Container from "@/app/Component/Container";
import EmptyState from "@/app/Component/EmptyState";
import getCurrentUser from "@/app/action/getCurrentUser";
import getListingById from "@/app/action/getListingById";
import { SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import ListingClient from "./ListingClient";
import getReservation from "@/app/action/getReservations";

interface IParams{
   listingId?:string 
}

const ListingPage = async ({params}:{params:IParams})=>{
    const listing = await getListingById(params) 
    const currentUser = await getCurrentUser()
    const reservations= await getReservation(params) 

    if(!listing){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    return(
        <ClientOnly>
            <ListingClient 
              listing = {listing}
              currentUser = {currentUser}
              reservations={reservations}
            />
        </ClientOnly>
    )
}

export default ListingPage;