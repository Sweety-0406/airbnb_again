import EmptyState from "../../Component/EmptyState";
import ClientOnly from "../../Component/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import getFavoriteListing from "../action/getFavoriteListing";
import { getTranslations } from "next-intl/server";

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
    const t = await getTranslations("favs")

    if(listing.length == 0){
        return(
            <ClientOnly>
                <EmptyState
                    title={t("title")}
                    subtitle={t("subtitle")} 
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