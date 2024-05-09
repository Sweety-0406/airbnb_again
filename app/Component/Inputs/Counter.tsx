'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps{
    title : string
    subtitle : string
    value : number
    onChange : (value:number) => void
}

const Counter:React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) =>{
    const onAdd = useCallback(()=>{
        onChange(value+1);
    },[value,onChange])

    const onSub = useCallback(()=>{
        if(value == 1){
            return ;
        }
        onChange(value-1);
    },[value,onChange])

    return (
        <div className="flex flex-row justify-between cursor-pointer mb-7 mt-6 text-sm">
            <div className="flex flex-col">
                <div> {title} </div>
                <div className="text-gray-500"> {subtitle} </div>
            </div>
            <div className="flex flex-row justify-between ">
               <div
               onClick={onSub}
               className="
                w-10
                h-10
                text-black
                border-[1px]
                rounded-full
                flex
                items-center
                justify-center
                mr-3
               "
               >
                  <AiOutlineMinus />
               </div>  
               <div className="pt-2">
                   {value}
                </div>  
                <div
               onClick={onAdd}
               className="
                w-10
                h-10
                text-black
                border-[1px]
                rounded-full
                flex
                items-center
                justify-center
                ml-3
               "
               >
                   <AiOutlinePlus />
               </div>  
            </div>
        </div>
    )
}

export default Counter;