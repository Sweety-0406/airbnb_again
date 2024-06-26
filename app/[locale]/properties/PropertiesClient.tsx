

'use client'

import axios from "axios"
import Button from "../../Component/Button"
import Container from "../../Component/Container"
import Heading from "../../Component/Heading"
import ListingCard from "../../Component/Listing/ListingCard"
import { SafeListing, SafeReservation, SafeUser } from "../../types"
import toast from "react-hot-toast"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useTranslations } from "next-intl"


interface TripsClientProps{
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

const PropertiesClient:React.FC<TripsClientProps> =  ({
    listings,
    currentUser,
}) =>{
    const[deletingId,setDeletingId] = useState('')
    const router = useRouter()
    const t = useTranslations("props")

    const cancelHandler = useCallback((id : string)=>{
        setDeletingId(id)
            axios.delete(`/api/listing/${id}`)
            .then(()=>{
                toast.success("Successfully property deleted");
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

    return(
       <div className="pt-32">
         <Container>
            <Heading
               title={t("propTitle")}
               subtitle={t("propSubtitle")}
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
                    listings.map((listing)=>(
                        <ListingCard 
                            key={listing.id}
                           data={listing}
                           currentUser={currentUser}
                           actionId={listing.id}
                           onAction={cancelHandler}
                           actionLabel="Delete Property"
                           disabled = {deletingId === listing.id}
                        />
                    ))
                }
             </div>
        </Container>
       </div>
    )
}


export default PropertiesClient