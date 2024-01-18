

import ClientOnly from "./Component/ClientOnly"
import Container from "./Component/Container"
import ListingCard from "./Component/Listing/ListingCard";
import EmptyState from "./EmptyState";
import getCurrentUser from "./action/getCurrentUser";
import  getListings  from "./action/getListings";

interface HomeProps{
  
}

const Home =async () => {
  const listings =await getListings();
  const currentUser = await getCurrentUser();
  
  if(listings.length === 0){
    return(
      <ClientOnly>
        <EmptyState showSet />
      </ClientOnly>
    )
  }
   return(
    <div>
      <ClientOnly>
        <Container>
          <div className="
           mt-44
           grid
           grid-col-1
           grid-cols-1
           sm:grid-cols-2
           md:grid-cols-3
           lg:grid-cols-4
           xl:grid-cols-5
           2xl:grid-cols-6
           gap-8
          ">
            {listings.map((listing)=>{
              return (
                <ListingCard 
                currentUser={currentUser}
                key={listing.id}
                data={listing}                  
                />
              )
            })}
          </div>
        </Container>
      </ClientOnly>
    </div>
   )
}

export default Home;
