'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import useCountries from "@/app/Hooks/useCountries";
import Image from 'next/image'
import HeartButton from "../HeartButton";

interface ListingHeadProps{
    title:string,
    locationValue:string
    imageSrc:string
    currentUser?:SafeUser | null
    listingId:string
}
const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
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
            <div className="
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
            </div>
        </div>
    )
}

export default ListingHead