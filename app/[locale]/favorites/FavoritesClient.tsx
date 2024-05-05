'use client'

import { useTranslations } from "next-intl"
import Container from "../../Component/Container"
import Heading from "../../Component/Heading"
import ListingCard from "../../Component/Listing/ListingCard"
import { SafeListing, SafeUser } from "../../types"


interface TripsClientProps{
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

const FavoritesClient:React.FC<TripsClientProps> =  ({
    listings,
    currentUser,
}) =>{
    const t = useTranslations("favs")
    return(
       <div className="mt-16">
         <Container>
            <Heading
               title={t("favTitle")}
               subtitle={t("favSubtitle")}
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