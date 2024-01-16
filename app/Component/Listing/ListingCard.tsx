'use client'

import { SafeListing, SafeUser } from "@/app/types"

interface ListingCardProps{
    data : SafeListing
    currentUser : SafeUser | null,
    reservation ?: null
    actionLabel ?: string
    actionId?:string
    disabled?:boolean
    onAction?:(id:string)=>void
}

const ListingCard=()=>{
    return(
        <div></div>
    )
}

export default ListingCard