'use client'

import { IconType } from "react-icons"

interface ListingCategoryProps{
    label:string
    description:string
    icon : IconType
}
const ListingCategory:React.FC<ListingCategoryProps> = ({
    label,
    description,
    icon : Icon
}) => {
    return (
        <div className="flex flex-row gap-3">
            <div>
                <Icon
                 size={24}
                 className="text-slate-600"
                 />
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-lg font-bold"> {label} </div>
                <div className="text-gray-600"> {description} </div>
            </div>
        </div>
    )
}

export default ListingCategory