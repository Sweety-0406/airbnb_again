'use client';

import { SafeImage, SafeUser, SafeVideo } from "@/app/types";
import Heading from "../Heading";
import useCountries from "@/app/Hooks/useCountries";
import Image from 'next/image'
import HeartButton from "../HeartButton";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ListingHeadProps{
    title:string,
    locationValue:string
    images: SafeImage[]
    videos: SafeVideo[]
    currentUser?:SafeUser | null
    listingId:string
}
const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    images,
    videos,
    currentUser,
    listingId
}) =>{
    const {getByValue} = useCountries();
    const location = getByValue(locationValue)
    return(
        <div>
            <Heading 
                title={title}
                subtitle={`${location?.region},${location?.value}`}
            />
            
            <Carousel className="w-full rounded-xl">
            <CarouselContent className=" rounded-xl">
                {Array.from({ length: images.length + videos.length }).map((_, index) => (
                <CarouselItem key={index} className="rounded-xl">
                    <div className="p-1 rounded-xl">
                    <Card className="rounded-xl">
                        <CardContent className="flex aspect-video items-center rounded-xl justify-center p-0 ">
                        <div
                        className="
                        w-full
                        h-full
                        overflow-hidden
                        rounded-xl
                        relative
                        ">
                        {index < images.length ? 
                         (
                            <div>
                                <Image 
                                fill
                                alt='Listing'
                                src={images[index].url}
                                className="
                                
                                object-cover
                                w-full 
                                h-full
                                group-hover:scale-110
                                transition
                                rounded-xl
                                "
                                />
                                {index == 0 && (
                                    <div className=" z-40">
                                        <HeartButton
                                        currentUser = {currentUser}
                                        listingId={listingId}
                                        />
                                    </div>
                                )}
                            </div>
                         ):(
                            <video 
                            autoPlay
                            controls
                            muted
                            src={videos[(index) - (images.length)].url}
                            className="
                            z-10
                            object-cover
                            w-full 
                            h-full
                            group-hover:scale-110
                            transition
                            rounded-xl
                            "
                            >video</video>
                         )
                        }
                        <div className="-mr-[90%]">
                            <HeartButton
                            currentUser = {currentUser}
                            listingId={listingId}
                            />
                        </div>
                        </div>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        </div>
    )
}

export default ListingHead



            {/* <div className="
             w-full
             h-[65vh]
             overflow-hidden
             rounded-xl
             relative
            ">
                <Image 
                    fill
                    alt="airbnb image"
                    src={imageSrc}
                    className="object-cover w-full"
                />   
                <HeartButton
                  listingId={listingId} 
                  currentUser={currentUser}
                />             
            </div> */}