'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import useCountries from "@/app/Hooks/useCountries";


const Map = dynamic(()=> import('../Map'))
interface ListingInfo{
    user : SafeUser 
    category : {
        icon : IconType
        label : string
        description : string
    } | undefined
    description : string
    roomCount : number
    bathroomCount : number
    guestCount : number
    locationValue : string
}
const ListingInfo:React.FC<ListingInfo> = ({
    user,
    category,
    description,
    roomCount,
    bathroomCount,
    guestCount,
    locationValue
}) => {
    const {getByValue} = useCountries();
    const coordinates = getByValue(locationValue)?.latlng
    return(
        <div className="
         flex
         flex-col
         gap-6
        ">
           <div className="flex  flex-col gap-3">
            <div className="flex flex-row gap-3">
                <div className="text-xl font-bold">Hosted By</div>
                <div className="pt-1">
                    <Avatar
                     src={user.image}
                     />
                </div>
            </div>
            <div className="flex flex-row gap-2 text-slate-600">
                <div>{`${guestCount} guest`}</div>
                <div>{`${roomCount} rooms`}</div>
                <div>{`${bathroomCount} bathrooms`}</div>
            </div>
           </div>
           <hr />
           {category && (
             <ListingCategory 
               icon = {category.icon}
               label = {category.label}
               description = {category.description}
             />
           )}
           <hr />
           <div className="text-gray-600">
            {description}
           </div>
           <hr />
            <div className="z-0">
            <Map 
             center={coordinates}
            />
            </div>
        </div>
    )
}

export default ListingInfo