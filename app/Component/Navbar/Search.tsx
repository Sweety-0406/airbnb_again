'use client';

import {BsSearch} from 'react-icons/bs'
import useSearchModal from '@/app/Hooks/useSearchModal';
import useCountries from '@/app/Hooks/useCountries';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';
const Search=()=>{
    const searchModal = useSearchModal()
    const {getByValue} = useCountries()
    const params = useSearchParams()

    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    const locationHandler = useMemo(()=>{
        if(!locationValue){
            return "Anywhere"
        }
        return getByValue(locationValue as string)?.label
    },[locationValue,getByValue])

    const durationHandler = useMemo(()=>{
        if(startDate && endDate){
            let start = new Date(startDate as string)
            let end = new Date(endDate as string)
            var totalDays = differenceInDays(end,start)
            if(totalDays === 0){
                totalDays = 1
            }
            return `${totalDays} Days`
        }
        return "Any Week"
    },[startDate,endDate])

    const guestHandler = useMemo(()=>{
        if(guestCount){
            return `${guestCount} Guests`
        }
        return "Add guests"
    },[guestCount])

    return(
        <div
         onClick={searchModal.onOpen}
         className="
          border-[1px]
          rounded-full
          py-[12px]
          px-5
          hover:shadow-md
          cursor-pointer
        ">
            <div className="flex flex-row justify-between items-center px-2">
                <div
                 className="
                  px-2
                  sm:border-r-[1px]
                  text-md
                  font-semibold
                  hover:underline underline-offset-2
                  truncate
                ">
                    {locationHandler}
                </div>
                <div
                 className="
                  hidden
                  sm:block
                  px-2
                  border-r-[1px]
                  text-md
                  font-semibold
                  hover:underline underline-offset-2
                  truncate
                ">
                    {durationHandler} 
                </div>
                   <div className='hidden sm:block'>
                        <div className=" flex flex-row justify-between items-center">
                            <div
                            className="
                            px-2
                            text-md
                            text-gray-600
                            truncate
                            hover:underline underline-offset-2
                            "
                            >
                                {guestHandler}
                            </div>
                            <div className="bg-rose-500 rounded-full text-white w-8 h-8 text-center pt-1 pl-1">
                            <BsSearch size={15} className='mt-1 ml-1'/>
                            </div>
                        </div>                    
                   </div>
                <div>
                    
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Search;