'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {BiDollar} from 'react-icons/bi'

interface InputProps{
   id:string
   label:string
   type?:string
   formatPrice?:boolean
   register: UseFormRegister<FieldValues>
   required?:boolean
   errors:FieldErrors
}
const Input:React.FC<InputProps>=({
    id,
    label,
    type,
    formatPrice,
    required,
    errors,
    register
})=>{
    return(
        <div className="
          flex
          flex-row
          relative
          w-full
          mt-4
          
        ">
            {formatPrice && (
               <>
                <BiDollar
                  size={22}
                  className="absolute text-gray-500 left-2 top-7 z-20"  
                />
               </>
            )}
            <input
             type={type} 
             id={id}
             {...register(id,{required})}
             placeholder=" "
             className={`
               peer
               z-9
               relative
               pt-[25px]
               pb-1
               w-full
               border-2
               rounded-md
               transiton
               text-gray-500
               ${formatPrice?'pl-9':'pl-4'}
               ${errors[id]?'border-rose-500':'border-neutral-300'}
               ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
               ${errors[id]?'bg-rose-100':'bg-white'}
             `}
            />
            <label className={`
               absolute
               transform
               duration-150
               translate-y-3
               text-sm
               font-semibold
               ${formatPrice?'pl-9':'pl-4'}
               peer-focus:translate-y-1
               peer-focus:scale-75
               peer-focus:text-gray-500
                
            `}>
                {label}
            </label>
        </div>
    )
}

export default Input;