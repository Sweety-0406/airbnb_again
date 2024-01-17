'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import { useCallback, useState } from "react";

interface HeartButtonProps{
    currentUser?: SafeUser| null
    listingId : string
}
const HeartButton:React.FC<HeartButtonProps>=({
    currentUser,
    listingId
})=>{
    const [hasFavorite, setHasFavorite] = useState(false);
    const click = useCallback(()=>{
        
        setHasFavorite((value)=> !value);
    },[])
    return (
        <div className="
           cursor-pointer
           hover:opacity-70
           relative
        ">
            <AiOutlineHeart
              size={27}
              className="
               fill-white
               -top-{2px}
               -right-{4px}
              "
             />
            <AiFillHeart
             className={`
               ${hasFavorite?'fill-rose-500':'fill-neutral-400'}
             `}
             />
        </div>
    )
}
 
export default HeartButton;