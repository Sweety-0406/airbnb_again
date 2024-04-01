import EmptyState from "../Component/EmptyState";
import ClientOnly from "../Component/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import Heading from "../Component/Heading";
import getListings from "../action/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async ()=>{
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
    const listings = await getListings( {userId : currentUser.id}) 
    listings.map((res)=>(
        console.log(res.id)
    ))
    if(listings.length == 0){
        return(
            <ClientOnly> 
                <EmptyState
                    title="No Properties Found!"
                    subtitle="Looks like you no properties yet" 
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