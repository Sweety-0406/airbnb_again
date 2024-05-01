'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import { useCallback, useState } from "react";
import useFavorite from "../Hooks/useFavorites";

interface HeartButtonProps{
    currentUser?: SafeUser| null
    listingId : string
}
const HeartButton:React.FC<HeartButtonProps>=({
    currentUser,
    listingId
})=>{
    const {hasFavorite,toggleFavorite} = useFavorite({
        listingId,
        currentUser
    })
    return (
        <div 
           onClick={toggleFavorite}
           className="
           cursor-pointer
           hover:opacity-70
           relative
           pr-[420px]
           sm:pr-[260px]
           md:pr-[200px]
           xl:pr-[260px]
        ">
            <AiOutlineHeart
              size={26}
              className="
               absolute
               fill-white
                top-3
                right-[17px]
               
              "
             />
            <AiFillHeart
            size={23}
             className={`
              absolute
               ${hasFavorite?'fill-rose-500':'fill-neutral-500/70'}
               top-[13.2px]
               right-[18.5px]
             `}
             />
        </div>
    )
}
 
export default HeartButton;