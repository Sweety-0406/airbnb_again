import ClientOnly from "./Component/ClientOnly"
import Container from "./Component/Container"
import ListingCard from "./Component/Listing/ListingCard";
import EmptyState from "./EmptyState";
import { getListings } from "./action/getListings";

interface HomeProps{
  
}

const Home =async () => {
  const listing =await getListings();
  
  if(listing.length === 0){
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
          ">
            {listing.map(()=>{
              return (
                <ListingCard />
              )
            })}
          </div>
        </Container>
      </ClientOnly>
    </div>
   )
}

export default Home;
