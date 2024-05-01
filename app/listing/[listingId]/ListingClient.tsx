'use client';

import { Reservation } from "@prisma/client";
import { SafeListing, SafeReservation, SafeUser } from "../../types";
import Container from "../../Component/Container";
import useCountries from "../../Hooks/useCountries";
import ListingHead from "../../Component/Listing/ListingHead";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "../../Component/Navbar/Categories";
import ListingInfo from "../../Component/Listing/ListingInfo";
import ListingReservation from "@/app/Component/Listing/ListingReservation";
import useLoginModal from "@/app/Hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { Range } from "react-date-range";


const initialDateRange = {
    startDate : new Date(),
    endDate : new Date(),
    key:'selection'
}
interface ListingClientProps{
    reservations?:SafeReservation[]
    listing:SafeListing & {
        user : SafeUser
    }
    currentUser?: SafeUser | null 
}
const ListingClient:React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
})=>{
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(()=>{
        let dates:Date[]=[];
        reservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start:new Date(reservation.startDate),
                end:new Date(reservation.endDate)
                
            })
            dates = [...dates, ...range];
        })
        return dates;
        
    },[reservations])

    const [isLoading,setIsLoading]=useState(false);
    const [totalPrice,setTotalPrice]=useState(listing.price);
    const [dateRange,setDateRange]=useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios.post('/api/reservations',{
            listingId : listing.id,
            totalPrice,
            startDate: dateRange.startDate,
            endDate : dateRange.endDate
        })
        .then(()=>{
            toast.success('Successfully reservaed.')
            setDateRange(initialDateRange);
            router.push('/trips')
        })
        .catch(()=>{
            toast.error('Something went wrong...')
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[
        router,
        listing?.id,
        totalPrice,
        dateRange,
        loginModal,
        currentUser
    ])
    
    useEffect(() => {
      if(dateRange.startDate && dateRange.endDate){
        const dayCount = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate
        )
        if(dayCount && listing.price){
            setTotalPrice(dayCount * listing.price);
        }
        else{
            setTotalPrice(listing.price)
        }
      }
      
    }, [dateRange,listing.price])
    

    const category = useMemo(()=>{
        return categories.find((item)=>{
          item.label === listing.category
        })
    },[listing.category])

    return (
        <Container>
            <div className="max-w-screen-lg max-auto mx-auto mt-16">
                <div className="flex flex-col gap-6">
                    <div className="">
                        <ListingHead 
                        images={listing.images}
                        videos={listing.videos}
                        title={listing.title}
                        locationValue={listing.locationValue}
                        currentUser={currentUser}
                        listingId = {listing.id}
                        />
                    </div>
                    <div className="
                     grid
                     grid-cols-1
                     md:grid-cols-2
                     md:gap-7
                    
                    ">
                        <ListingInfo
                          guestCount = {listing.guestCount}
                          roomCount = {listing.roomCount}
                          bathroomCount = {listing.bathroomCount}
                          category = {category} 
                          description = {listing.description}
                          locationValue = {listing.locationValue}
                          user={listing.user}
                        />
                        <div className="
                          order-first
                          mb-10
                          md:order-last
                         
                        ">
                            <ListingReservation
                              totalPrice={totalPrice}
                              price = {listing.price}
                              onSubmit={onCreateReservation}
                              disabledDates = {disabledDates}
                              disabled={isLoading}
                              dateRange ={dateRange}
                              onChangeDate={(value)=>setDateRange(value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient;