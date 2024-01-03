'use client';

import {BsSearch} from 'react-icons/bs'
const Search=()=>{
    return(
        <div
         onClick={()=>{}}
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
                  pr-4
                  text-md
                  font-semibold
                  hover:underline underline-offset-2
                ">
                    Anywhere
                </div>
                <div
                 className="
                  hidden
                  sm:block
                  pr-4
                  text-md
                  font-semibold
                  hover:underline underline-offset-2
                ">
                    Any week
                </div>
                   <div className='hidden sm:block'>
                        <div className=" flex flex-row justify-between items-center">
                            <div
                            className="
                            pr-4
                            text-md
                            text-gray-600
                            hover:underline underline-offset-2
                            ">
                                Add guests
                            </div>
                            <div className="bg-rose-500 rounded-full text-white w-7 h-7 text-center pt-1 pl-1">
                            <BsSearch size={18}/>
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