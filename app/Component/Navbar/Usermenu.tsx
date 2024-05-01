'use client';

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState, useEffect, useRef } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/Hooks/useRegisterModal';
import useLoginModal from '@/app/Hooks/useLoginModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/Hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UsermenuProps{
    currentUser? : SafeUser | null;
}
const Usermenu:React.FC<UsermenuProps>=({currentUser})=>{
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen,setIsOpen] = useState(false);

    const toggleIsOpen = useCallback(()=>{
        setIsOpen((value)=>!value)
    },[])

    useEffect(()=>{
        document.addEventListener("click",clickHandler,true)
    },[])
    const refone = useRef(null)

    const clickHandler = (e:any) =>{
        
        if (refone.current) {
            if (!(refone.current as HTMLElement).contains(e.target)) {
                setIsOpen(false);
                console.log("outside");
            } else {
                setIsOpen(true);
                console.log("inside");
            }
        }
    }


    const onRent =useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
         rentModal.onOpen();
    },[currentUser,loginModal,rentModal])
    

    return(
        <div className='relative'>
            <div className="
            flex
            flex-row
            justify-between
            items-center
            ">
                <div 
                onClick={onRent}
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
                truncate
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
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
                
            </div>

            {isOpen && (
                <div
                 ref={refone}
                 className='
                  absolute 
                  rounded-xl
                  shadow-md
                  cursor-pointer
                  right-0
                  bg-white
                '>
                    <div className='flex flex-col rounded-xl'>
                       {currentUser?(
                            <>
                            <MenuItem 
                            label='My trips'
                            onClick={()=>router.push("/trips")}
                            />
                            <MenuItem 
                            label='My favorites'
                            onClick={()=>router.push('/favorites')}
                            />
                            <MenuItem 
                            label='My reservation'
                            onClick={()=>router.push("/reservations")}
                            />
                            <MenuItem 
                            label='My properties'
                            onClick={()=>router.push('/properties')}
                            />
                            <MenuItem 
                            label='Airbnb my home'
                            onClick={onRent}
                            />
                            <hr />
                            <MenuItem 
                            label='Logout'
                            onClick={()=>signOut()}
                            />
                           
                            </>
                       ):(
                            <>
                            <MenuItem 
                            label='Login'
                            onClick={(loginModal.onOpen)}
                            />
                            <MenuItem 
                            label='Signup'
                            onClick={registerModal.onOpen}
                            />
                            </>
                       )}
                    </div>
                    
                </div>
            )}

        </div>
        

    )
}

export default Usermenu;

