'use client'

import Container from "../Component/Container"
import Heading from "../Component/Heading"
import ListingCard from "../Component/Listing/ListingCard"
import { SafeListing, SafeUser } from "../types"


interface TripsClientProps{
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

const FavoritesClient:React.FC<TripsClientProps> =  ({
    listings,
    currentUser,
}) =>{
    return(
       <div className="mt-48">
         <Container>
            <Heading
               title="Favorites"
               subtitle="list of places that you have favorited !"
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
                    listings.map((listing)=>(
                        <ListingCard 
                            key={listing.id}
                           data={listing}
                           currentUser={currentUser}
                        />
                    ))
                }
             </div>
        </Container>
       </div>
    )
}


export default FavoritesClient