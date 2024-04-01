import EmptyState from "../Component/EmptyState";
import ClientOnly from "../Component/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import getReservation from "../action/getReservations";
import FavoritesClient from "./FavoritesClient";
import Heading from "../Component/Heading";
import getFavoriteListing from "../action/getFavoriteListing";

const FavoritePage = async ()=>{
    const currentUser = await getCurrentUser()
    if(!currentUser){
        console.log("no user found")
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Looks like you havent login. Please login." 
                />
            </ClientOnly>
        )
    }
    const listing = await getFavoriteListing() 

    if(listing.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No Trips Found!"
                    subtitle="Looks like you havent reserved any trips" 
                />
            </ClientOnly>
            
        )
    }
    return(
        <ClientOnly>
            <FavoritesClient
              listings = {listing}
              currentUser = {currentUser}
             />
        </ClientOnly>
    )
}

export default FavoritePage