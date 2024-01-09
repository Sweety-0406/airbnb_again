'use client'

import { IconType } from "react-icons"

interface CategoryInputProps{
    label:string
    icon : IconType
    isSelected?:boolean
    onClick:(value:string)=>void
}
const  CategoryInput:React.FC<CategoryInputProps>= ({
    label,
    icon:Icon,
    isSelected,
    onClick
})=>{
    return (
        <div 
        onClick={()=>onClick(label)}
        className={`
            m-2
            flex
            flex-col
            text-black
            cursor-pointer
            hover:border-black
            border-2
            pl-2
            py-3
            rounded-xl
            ${isSelected?'border-black':'border-gray-300'}
        `} >
            <div className="mb-2">
                <Icon size={26} />
            </div>
            <div>{label}</div>
        </div>
    )
}

export default CategoryInput;