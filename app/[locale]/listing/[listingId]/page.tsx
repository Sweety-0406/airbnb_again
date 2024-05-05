import ClientOnly from "@/app/Component/ClientOnly";
import EmptyState from "@/app/Component/EmptyState";
import getCurrentUser from "@/app/action/getCurrentUser";
import getListingById from "@/app/action/getListingById";
import ListingClient from "./ListingClient";
import getReservation from "@/app/action/getReservations";
import ListingFooterContent from "@/app/Component/Listing/listingFooterContent";


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
            <div className="mt-7">
                <hr/>
                <footer>
                    <ListingFooterContent />
                </footer>
            </div>
        </ClientOnly>
    )
}

export default ListingPage;