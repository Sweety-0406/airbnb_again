import EmptyState from "../../Component/EmptyState";
import ClientOnly from "../../Component/ClientOnly";
import getCurrentUser from "../action/getCurrentUser";
import getReservation from "../action/getReservations";
import TripsClient from "./TripsClient";
import Heading from "../../Component/Heading";
import { getTranslations } from "next-intl/server";

const TripsPage = async ()=>{
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
    const reservations = await getReservation({userId : currentUser.id}) 
    const t = await getTranslations("trips")
    if(reservations.length == 0){
        console.log("not trips found")
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
            <TripsClient
              reservations = {reservations}
              currentUser = {currentUser}
             />
        </ClientOnly>
    )
}

export default TripsPage