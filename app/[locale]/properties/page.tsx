import EmptyState from "../../Component/EmptyState";
import ClientOnly from "../../Component/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import Heading from "../../Component/Heading";
import getListings from "../action/getListings";
import PropertiesClient from "./PropertiesClient";
import { getTranslations } from "next-intl/server";

const PropertiesPage = async ()=>{
    const currentUser = await getCurrentUser()
    const t = await getTranslations("props")
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
    const listings = await getListings( {userId : currentUser.id}) 
    listings.map((res)=>(
        console.log(res.id)
    ))
    if(listings.length == 0){
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
            <PropertiesClient
              listings = {listings}
              currentUser = {currentUser}
             />
        </ClientOnly>
    )
}

export default PropertiesPage