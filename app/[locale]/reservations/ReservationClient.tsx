

'use client'

import axios from "axios"
import Container from "../../Component/Container"
import Heading from "../../Component/Heading"
import ListingCard from "../../Component/Listing/ListingCard"
import { SafeReservation, SafeUser } from "../../types"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useTranslations } from "next-intl"


interface TripsClientProps{
    reservations: SafeReservation[],
    currentUser?: SafeUser | null
}

const ResevationClient:React.FC<TripsClientProps> =  ({
    reservations,
    currentUser,
}) =>{
    const[deletingId,setDeletingId] = useState('')
    const router = useRouter()
    const t = useTranslations("reservs")


    
    const cancelHandler = useCallback((id : string)=>{
            setDeletingId(id)
            axios.delete(`/api/reservations/${id}`)
            .then(()=>{
                toast.success("Successfully reservation cancelled");
                router.refresh()
            })
            .catch((err)=>{
                toast.error("error found")
            })
            .finally(()=>{
                setDeletingId('')
            })
        },[router]
    )   
    
    reservations.map((res)=>(
        console.log(res.totalPrice)
    ))
    return(
       <div className="pt-32">
         <Container>
            <Heading
               title={t("reservTitle")}
               subtitle={t("reservSubtitle")}
             />
             <div className="   
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-8
             ">
                {
                    reservations.map((reservation)=>(
                        <ListingCard 
                            key={reservation.id}
                           data={reservation.listing}
                           currentUser={currentUser}
                           reservation={reservation}
                           actionId={reservation.id}
                           onAction={cancelHandler}
                           actionLabel="Cancel guest Reservation"
                           disabled = {deletingId === reservation.id}
                        />
                    ))
                }
                
             </div>
        </Container>
       </div>
    )
}


export default ResevationClient