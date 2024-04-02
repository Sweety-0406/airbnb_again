import ClientOnly from "./Component/ClientOnly"
import Container from "./Component/Container"
import ListingCard from "./Component/Listing/ListingCard";
import EmptyState from "./Component/EmptyState";
import getCurrentUser from "./action/getCurrentUser";
import  getListings, { IListingParams }  from "./action/getListings";
import { itemCount } from "./action/getListings";
import Heading from "./Component/Heading";
import Link from "next/link";

interface HomeProps{
  searchParams : IListingParams
}

const Home =async ({searchParams}:HomeProps) => {
  const listings =await getListings(searchParams);
  const currentUser = await getCurrentUser();

  let page = 1
  if(searchParams.page){
    page = parseInt(searchParams.page,10)
  }
  let perPage = 10
  const totalPages = Math.ceil(itemCount / perPage)-1;
  console.log(totalPages)
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const isPageOutOfRange: boolean = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  
  
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
           grid-cols-1
           sm:grid-cols-2
           md:grid-cols-3
           lg:grid-cols-4
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
          {isPageOutOfRange ? (
            <div>
              <Heading
               title="No more pages"
               subtitle="There is no more page to show you"
               />
            </div> 
          ) : (
            <div>
                <div className="flex justify-center items-center mt-16">
                  <div className="flex border-[1px] gap-4 rounded-[10px] border-rose-300 p-4">
                    {page === 1 ? (
                      <div className="opacity-60 pt-1" aria-disabled="true">
                        Previous
                      </div>
                    ) : (
                      <Link href={`?page=${prevPage}`} aria-label="Previous Page" className="hover:bg-rose-200 rounded-xl p-1 font-bold">
                        Previous
                      </Link>
                    )}

                    {pageNumbers.map((pageNumber: number, index: number) => (
                      <Link
                        key={index}
                        className={
                          page === pageNumber
                            ? 'bg-rose-300 fw-bold px-2 rounded-md text-black'
                            : 'hover:bg-rose-300 px-1 rounded-md'
                        }
                        href={`?page=${pageNumber}`}
                      >
                        {pageNumber}
                      </Link>
                    ))}

                    {page === totalPages ? (
                      <div className="opacity-60 pt-1" aria-disabled="true">
                        Next
                      </div>
                    ) : (
                      <Link href={`?page=${nextPage}`} aria-label="Next Page" className="hover:bg-rose-200 rounded-xl p-1 font-bold">
                        Next
                      </Link>
                    )}
                  </div>
              </div>
            </div>
          )}
        </Container>
      </ClientOnly>
    </div>
   )
}

export default Home;
