'use client';

import { TbBeachOff, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiIsland, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import { BsSnow } from "react-icons/bs";
import CategoryBox from "./CategoryBox";
import { useSearchParams } from "next/navigation";

export const categories=[
    {
        label:'Beachfront',
        icon:TbBeachOff,
        description:'This property is close to the Beach!'
    },
    {
        label:'Windmills',
        icon:GiWindmill,
        description:'This property has windmills!'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        description:'This property is modern!'
    },
    {
        label:'Countryside',
        icon:TbMountain,
        description:'This property is the countryside!'
    },
    {
        label:'Pools',
        icon:TbPool,
        description:'This property has a beautiful pool!'
    },
    {
        label:'Island',
        icon:GiIsland,
        description:'This property is on an island!'
    },
    {
        label:'Lake',
        icon:GiBoatFishing,
        description:'This property is near a lake!'
    },
    {
        label:'Skiing',
        icon:FaSkiing,
        description:'This property has skiing activities!'
    },
    {
        label:'Castles',
        icon:GiCastle,
        description:'This property is an ancient castle!'
    },
    {
        label:'Caves',
        icon:GiCaveEntrance,
        description:'This property is in a spooky cave!'
    },
    {
        label:'Camping',
        icon:GiForestCamp,
        description:'This property offers camping activities!'
    },
    {
        label:'Arctic',
        icon:BsSnow,
        description:'This property is arctic environment!'
    },
    {
        label:'Desert',
        icon:GiCactus,
        description:'This property is in the desert!'
    },
    {
        label:'Barns',
        icon:GiBarn,
        description:'This property is in a barn!'
    },
    {
        label:'Lux',
        icon: IoDiamond,
        description:'This property is brand new and luxurious!'
    }
]
 
const Categories = () =>{
    const params = useSearchParams();
    const category = params?.get('category');
    return (
        <div className="
         border-t-[2px]
         border-gray-300
         
         mb-5 
        ">
            <div
            className="
             flex 
             flex-row
             justify-between
             items-center
             overflow-x-auto
             mx-6
             mt-4
             pb-2
             gap-[18px]
            ">
                {categories.map((item)=>(
                    <CategoryBox 
                    key={item.label}
                    label ={item.label}
                    icon={item.icon}
                    selected={category===item.label}
                    />
                ))}
            </div>
        </div>
    )
}

export default Categories;