import ClientOnly from "@/app/Component/ClientOnly";
import Container from "@/app/Component/Container";
import EmptyState from "@/app/EmptyState";
import getCurrentUser from "@/app/action/getCurrentUser";
import getListingById from "@/app/action/getListingById";
import { SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import ListingClient from "../ListingClient";

interface IParams{
   listingId?:string 
}

const ListingPage = async ({params}:{params:IParams})=>{
    const listing = await getListingById(params) 
    const currentUser = await getCurrentUser()
    
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
            />
        </ClientOnly>
    )
}

export default ListingPage;