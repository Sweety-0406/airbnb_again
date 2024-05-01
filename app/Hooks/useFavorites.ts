import { useCallback, useMemo } from "react"
import { SafeUser } from "../types"
import useLoginModal from "./useLoginModal"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface useFavoriteProps{
    listingId : string
    currentUser?:SafeUser | null
}

const useFavorite = ({
    listingId,
    currentUser
}:useFavoriteProps) =>{
    const loginMadal = useLoginModal();
    const router = useRouter();

    const hasFavorite = useMemo(()=>{
       const list = currentUser?.favoriteIds || [];
       return list.includes(listingId) 
    },[currentUser,listingId])

    const toggleFavorite = useCallback(async(
        e:React.MouseEvent<HTMLDivElement>
    )=>{
       e.stopPropagation();
       if(!currentUser){
          return loginMadal.onOpen()
       }
       try {
        let request;
        if(hasFavorite){
             request = () => axios.delete(`/api/favorites/${listingId}`)
             toast.success('Successfully deleted from the wishlist.')
        }else{
            request = () => axios.post(`/api/favorites/${listingId}`)
            toast.success('Successfully added to the wishlist.')
        }
        await request();
        router.refresh();
       } catch (error) {
        toast.error("Something went wrong...")
       }
    },[
        currentUser,
        hasFavorite,
        router,
        loginMadal,
        listingId
    ])

    return{
        hasFavorite,
        toggleFavorite
    }
}

export default useFavorite;