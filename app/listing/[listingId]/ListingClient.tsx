'use client';

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "../../types";
import Container from "../../Component/Container";
import useCountries from "../../Hooks/useCountries";
import ListingHead from "../../Component/Listing/ListingHead";
import { useMemo } from "react";
import { categories } from "../../Component/Navbar/Categories";
import ListingInfo from "../../Component/Listing/ListingInfo";

interface ListingClientProps{
    reservation?:Reservation[]
    listing:SafeListing & {
        user : SafeUser
    }
    currentUser?: SafeUser | null 
}
const ListingClient:React.FC<ListingClientProps> = ({
    reservation = [],
    listing,
    currentUser
})=>{
    
    const category = useMemo(()=>{
        return categories.find((item)=>{
          item.label === listing.category
        })
    },[listing.category])
    console.log("jiii")
    console.log(category)
    return (
        <Container>
            <div className="max-w-screen-lg max-auto mx-auto mt-44">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                     imageSrc={listing.imageSrc}
                     title={listing.title}
                     locationValue={listing.locationValue}
                     currentUser={currentUser}
                     listingId = {listing.id}
                    />
                    <div className="
                     grid
                     grid-cols-1
                     md:grid-cols-2
                     md:gap-7
                     mt-6
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
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient;