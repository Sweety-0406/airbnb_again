// 'use client'

// import useCountries from "@/app/Hooks/useCountries"
// import { SafeListing, SafeReservation, SafeUser, SafeImage } from "@/app/types"
// import { useRouter } from "next/navigation"
// import { useCallback, useMemo } from "react"
// import {format} from 'date-fns'
// import Image from 'next/image'
// import HeartButton from "../HeartButton"
// import Button from "../Button"
// import * as React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
//   } from "@/components/ui/carousel"

// interface ListingCardProps{
//     data : SafeListing 
//     currentUser?: SafeUser | null,
//     reservation ?: SafeReservation 
//     actionLabel ?: string
//     actionId?:string
//     disabled?:boolean
//     onAction?:(id:string)=>void
// }

// const ListingCard:React.FC<ListingCardProps>=({
//     data,
//     currentUser,
//     reservation,
//     actionId='',
//     actionLabel,
//     disabled,
//     onAction
// })=>{
//     const router=useRouter();
//     const {getByValue} = useCountries();
//     const location = getByValue(data.locationValue);
    
//     const price = useMemo(()=>{
//         if(!reservation){
//             return data.price;
//         }
//         return reservation.totalPrice;
//     },[reservation,data.price])

//     const reservationDate=useMemo(()=>{
//         if(!reservation){
//             return data.category
//         }
//         const start = new Date(reservation.startDate)
//         const end = new Date(reservation.endDate)
//         return `${format(start,'PPPP')} - ${format(end,'PPPP')}`
//     },[reservation])


//     const handleCancel = useCallback((
//         e:React.MouseEvent<HTMLButtonElement>
//     )=>{
//         e.stopPropagation();
//         onAction?.(actionId)
//     },[])

//     return(
//         <div
//           className="
//            cursor-pointer
//            group
//            w-full
//           " 
//         >
//             <div className="
//               flex
//               flex-col
//               gap-2
//               w-full
              
//             ">
//                 <div>
//                     <Carousel className="w-full ">
//                         <CarouselContent>
//                             {Array.from({ length: data.images.length }).map((_,index) => (
//                             <CarouselItem key={data.images[index].id}>
//                                 <Card>
//                                     <CardContent className="flex aspect-square items-center justify-center p-0">
//                                     <div
//                                     onClick={()=>router.push(`/listing/${data.id}`)}
//                                     className="
//                                     flex 
//                                     w-full
//                                     flex-col
//                                     relative
//                                     aspect-square
//                                     overflow-hidden
//                                     rounded-lg
//                                     border-[3px]
//                                     border-red-300
//                                     items-center
//                                     ">
//                                     <Image 
//                                     fill
//                                     alt='Listing'
//                                     src={data.images[index].url}
//                                     className="
//                                     z-10
//                                     object-cover
//                                     w-full
//                                     h-full
//                                     group-hover:scale-110
//                                     transition
//                                     "
//                                     />
//                                     <div className="-mr-[90%]">
//                                         <HeartButton
//                                         currentUser = {currentUser}
//                                         listingId={data.id}
//                                         />
//                                     </div>
//                                     </div>
//                                     </CardContent>
//                                 </Card>
//                             </CarouselItem>
//                             ))}
//                         </CarouselContent>
//                         <CarouselPrevious className="z-20"/>
//                         <CarouselNext className="z-20"/>
//                     </Carousel>
//                 </div>
//                 <div className="font-bold text-lg">
//                     {location?.region}, {location?.value}
//                 </div>
//                 <div className="text-gray-500 ">
//                     {reservationDate || data.category}
//                 </div>
//                 <div className="flex flex-row">
//                     <div className="font-semibold pr-2 ">${price}</div>
//                     {!reservation && (
//                         <div className="text-gray-500">night</div>
//                     )}
//                 </div>
//                 {onAction && actionLabel && (
//                     <div className="-ml-7 mr-7">
//                         <Button
//                         label={actionLabel}
//                         onClick={handleCancel}
//                         disabled = {disabled}
//                         outline = {disabled}
//                      />
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ListingCard
'use client'

import useCountries from "@/app/Hooks/useCountries"
import { SafeListing, SafeReservation, SafeUser, SafeImage } from "@/app/types"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import {format} from 'date-fns'
import Image from 'next/image'
import HeartButton from "../HeartButton"
import Button from "../Button"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

interface ListingCardProps{
    data : SafeListing 
    currentUser?: SafeUser | null,
    reservation ?: SafeReservation 
    actionLabel ?: string
    actionId?:string
    disabled?:boolean
    onAction?:(id:string)=>void
}

const ListingCard:React.FC<ListingCardProps>=({
    data,
    currentUser,
    reservation,
    actionId='',
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


    const handleCancel = useCallback((
        e:React.MouseEvent<HTMLButtonElement>
    )=>{
        e.stopPropagation();
        onAction?.(actionId)
    },[])

    return(
        <div
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
                <div>
                    <Carousel className="w-full ">
                        <CarouselContent>
                            {Array.from({ length: (data.images.length + data.videos.length) }).map((_,index) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-0">
                                    <div
                                    onClick={()=>router.push(`/listing/${data.id}`)}
                                    className="
                                    flex 
                                    w-full
                                    flex-col
                                    relative
                                    aspect-square
                                    overflow-hidden
                                    rounded-lg
                                    border-[3px]
                                    border-red-300
                                    items-center
                                    ">
                                    {index <data.images.length ? 
                                    (
                                        <div>
                                            <Image 
                                            fill
                                            alt='Listing'
                                            src={data.images[index].url}
                                            className="
                                            
                                            object-cover
                                            w-full
                                            h-full
                                            group-hover:scale-110
                                            transition
                                            relative
                                            "
                                            />
                                            {index == 0 && (
                                                <div className=" z-40">
                                                    <HeartButton
                                                    currentUser = {currentUser}
                                                    listingId={data.id}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ):(
                                        <video 
                                        controls
                                        autoPlay
                                        muted
                                        src={data.videos[(index)-(data.images.length)].url}
                                        className="
                                        z-10
                                        object-cover
                                        w-full
                                        h-full
                                        group-hover:scale-110
                                        transition
                                        "
                                        >video</video>
                                    )
                                    }
                                    </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="z-20"/>
                        <CarouselNext className="z-20"/>
                    </Carousel>
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
                {onAction && actionLabel && (
                    <div className="-ml-7 mr-7">
                        <Button
                        label={actionLabel}
                        onClick={handleCancel}
                        disabled = {disabled}
                        outline = {disabled}
                     />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListingCard