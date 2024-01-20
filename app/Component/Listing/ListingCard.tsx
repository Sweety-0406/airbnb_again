'use client'

import useCountries from "@/app/Hooks/useCountries"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import {format} from 'date-fns'
import Image from 'next/image'
import HeartButton from "../HeartButton"
import useFavorite from "@/app/Hooks/useFavorites"

interface ListingCardProps{
    data : SafeListing
    currentUser?: SafeUser | null,
    reservation ?: Reservation 
    actionLabel ?: string
    actionId?:string
    disabled?:boolean
    onAction?:(id:string)=>void
}

const ListingCard:React.FC<ListingCardProps>=({
    data,
    currentUser,
    reservation,
    actionId,
    actionLabel,
    disabled,
    onAction
})=>{
    const router=useRouter();
    const {getByValue} = useCountries();
    const location = getByValue(data.locationValue);
    
    const price = useMemo(()=>{
        if(!reservation){
            return data.price;
        }
        return reservation.totalPrice;
    },[reservation,data.price])
    const reservationDate=useMemo(()=>{
        if(!reservation){
            return data.category
        }
        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)
        return `${format(start,'PPPP')} - ${format(end,'PPPP')}`
    },[reservation])
    return(
        <div
          onClick={()=>router.push(`/listing/${data.id}`)}
          className="
           cursor-pointer
           group
           w-full
          " 
        >
            <div className="
              flex
              flex-col
              gap-2
              w-full
              
            ">
                <div className="
                  flex
                  flex-col
                  relative
                  aspect-square
                   overflow-hidden
                  rounded-lg
                ">
                    <Image 
                      fill
                      alt='Listing'
                      src={data.imageSrc}
                      className="
                      
                       object-cover
                       w-full
                       h-full
                       group-hover:scale-110
                       transition
                      "
                    />
                    <HeartButton
                      currentUser = {currentUser}
                      listingId={data.id}
                    />
                </div>
                <div className="font-bold text-lg">
                    {location?.region}, {location?.value}
                </div>
                <div className="text-gray-500 ">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row">
                    <div className="font-semibold pr-2 ">${price}</div>
                    {!reservation && (
                        <div className="text-gray-500">night</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListingCard