'use client'

import axios from "axios"
// import Button from "../../Component/Button"
import Container from "../../Component/Container"
import Heading from "../../Component/Heading"
import ListingCard from "../../Component/Listing/ListingCard"
import { SafeListing, SafeReservation, SafeUser } from "../../types"
import toast from "react-hot-toast"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { Separator } from "@/components/ui/separator"
import { IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"


interface TripsClientProps{
    reservations: SafeReservation[],
    currentUser?: SafeUser | null
}

const TripsClient:React.FC<TripsClientProps> =  ({
    reservations,
    currentUser,
}) =>{
    const[deletingId,setDeletingId] = useState('')
    const router = useRouter()
    const t = useTranslations("trips")
    const c = useTranslations("currencySign")
    
    const totalPrice = useMemo(()=>{
        if(reservations.length==0){
            return 0;
        }
        let amount =0;
        for(let i=0;i<reservations.length;i++){
            amount += Number(reservations[i].totalPrice);
        }
        return amount.toString()
    },[reservations])    
    
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
       <div className="mt-16">
         <Container>
            <Heading
               title={t("tripTitle")}
               subtitle={t("tripSubtitle")}
             />
             <div className="   
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5,
                2xl:grid-cols-6
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
                           onAction={cancelHandler}//need to do more things
                           actionLabel={t("cancelReservation")}
                           disabled = {deletingId === reservation.id}
                        />
                    ))
                }
            </div>
        </Container>
       </div>
    )
}


export default TripsClient