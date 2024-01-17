import { useMemo } from "react"
import { SafeUser } from "../types"

interface useFavoriteProps{
    listingId : string
    currentUser?:SafeUser | null
}

const useFavorite = ({
    listingId,
    currentUser
}:useFavoriteProps) =>{
    const hasFavorite = useMemo(()=>{
       const list = currentUser?.favoriteIds || [];
       return list.includes(listingId) 
    },[])
}