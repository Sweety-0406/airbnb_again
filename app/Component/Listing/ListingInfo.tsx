'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import useCountries from "@/app/Hooks/useCountries";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";


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
    const [isOpen, setIsOpen]=useState(false)
    const coordinates = getByValue(locationValue)?.latlng
    return(
        <div>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={()=>setIsOpen(false)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-4">About this space</DialogTitle>
                    <DialogDescription>
                      {description}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              
            )}
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
                <div>
                    <ListingCategory 
                icon = {category.icon}
                label = {category.label}
                description = {category.description}
                />
                <hr />
                </div>
            )}
            <div className="text-gray-600 max-h-60 overflow-clip ">
               {description}
            </div>
            <div>
                <Button className="bg-rose-500 hover:bg-rose-500 hover:opacity-50" onClick={()=>setIsOpen(true)}>View Full</Button>
            </div>
            <hr />
                <div className="z-0">
                    <div className="font-bold text-lg mb-4">
                        Where you'll be
                    </div>
                    <Map 
                center={coordinates}
                />
                </div>
            </div>
        </div>
    )
}

export default ListingInfo