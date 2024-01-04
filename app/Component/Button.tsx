'use client';

import { IconType } from "react-icons";

interface ButtonProps{
    label:string
    onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void
    disabled?: boolean
    outline?:boolean
    icon?:IconType
}
const Button:React.FC<ButtonProps>=({
    label,
    onClick,
    disabled,
    outline,
    icon:Icon
})=>{
    return (
        <button 
         onClick={onClick}
         disabled={disabled}
         className={`
           items-center
           relative
           hover:opacity-70
           hover:cursor-pointer
           rounded-md
           my-2
           py-3
           w-full
           mx-6
           font-semibold
           border-2
           ${outline?'bg-white':'bg-rose-500'}
           ${outline?'text-black':'text-white'}
           ${outline?'border-black':'border-rose-500'}
         `}
        >
            {Icon && (
                <Icon size={30} className="absolute left-6 top-1" />
            )}
            {label}
        </button>
    )
}

export default Button;