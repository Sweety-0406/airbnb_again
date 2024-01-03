'use client';

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
const Usermenu=()=>{

    const [isOpen,setIsOpen] = useState(false);

    const toggleIsOpen = useCallback(()=>{
        setIsOpen((value)=>!value)
    },[])

    return(
        <div className='relative'>
            <div className="
            flex
            flex-row
            justify-between
            items-center
            ">
                <div 
                onClick={()=>{}}
                className="
                hidden
                md:block
                px-4
                py-3
                font-semibold
                text-md
                cursor-pointer
                hover:rounded-full
                hover:bg-gray-100
                ">
                    Airbnb your home
                </div>
                <div
                 onClick={toggleIsOpen}
                 className="
                    ml-2
                    py-3
                    px-[10px]
                    border-[1px]
                    rounded-full
                    hover:shadow-md
                    flex
                    flex-row
                    cursor-pointer
                ">
                    <div  >
                    <AiOutlineMenu size={18}/>
                    </div>
                    <div className='
                    hidden
                    md:block
                    pl-1
                    '>
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='
                  absolute 
                  rounded-xl
                  shadow-md
                  cursor-pointer
                  right-0
                  bg-white
                '>
                    <div className='flex flex-col rounded-xl'>
                        <>
                        <MenuItem 
                          label='Login'
                          onClick={()=>{}}
                        />
                        <MenuItem 
                          label='Signup'
                          onClick={()=>{}}
                        />
                        </>
                    </div>
                    
                </div>
            )}

        </div>
        

    )
}

export default Usermenu;