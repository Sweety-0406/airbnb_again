'use client'

import { useEffect } from "react"
import EmptyState from "../Component/EmptyState"

interface ErrorStateProps{
    error : Error
}
const ErrorState:React.FC<ErrorStateProps> =  ({error}) =>{
    useEffect(()=>{
        console.log(error)
    },[error])
    return(
        <EmptyState 
            title="Oh Uh"
            subtitle="Something went wrong"
        />
    )
}

export default ErrorState