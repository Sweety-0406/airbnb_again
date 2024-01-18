'use client';

import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "../types";
import Container from "../Component/Container";
import useCountries from "../Hooks/useCountries";
import ListingHead from "../Component/Listing/ListingHead";

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
                </div>
            </div>
        </Container>
    )
}

export default ListingClient;