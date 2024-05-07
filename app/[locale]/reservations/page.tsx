import { getTranslations } from "next-intl/server"
import ClientOnly from "../../Component/ClientOnly"
import EmptyState from "../../Component/EmptyState"
import Heading from "../../Component/Heading"
import getCurrentUser from "../action/getCurrentUser"
import getReservation from "../action/getReservations"
import client from "../../libs/prismadb"
import ReservationClient from "./ReservationClient"


const ReservationPage = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                 title="Unauthorized"
                 subtitle="Seems like you are not logged in please login"
                />
            </ClientOnly>
        )
    }

    const reservation = await getReservation({authorId:currentUser.id})
    const t = await getTranslations("reservs")
    if( reservation.length === 0){
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
        <div className="mt-48">
            <ClientOnly>
                <ReservationClient
                   reservations = {reservation}
                   currentUser = {currentUser}
                />
            </ClientOnly>
        </div>
    )
}

export default ReservationPage