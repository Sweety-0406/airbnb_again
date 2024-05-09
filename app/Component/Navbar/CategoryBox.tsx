'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from 'query-string'

interface CategoryBoxProps{
    label:string
    icon: IconType
    selected?: boolean
}
const CategoryBox:React.FC<CategoryBoxProps> =({
    label,
    icon:Icon,
    selected,
})=>{
    const router = useRouter();
    const params = useSearchParams();
    const clickHandler = useCallback(()=>{
       let currentQuery = {}
       if(params){
        currentQuery = qs.parse(params.toString());
       }
       const updatedQuery :any= {
        ...currentQuery,
        category:label
       }

       if(params?.get('category') === label){
        delete updatedQuery.category
       }
       const url = qs.stringifyUrl({
         url:'/',
         query:updatedQuery
       })
       router.push(url)
    },[router,label,params])
    return(
        <div 
        onClick={clickHandler}
        className={`
          flex 
          flex-col
          justify-center
          items-center
          hover:text-black
          cursor-pointer
          ${selected ? 'underline underline-offset-4' : ' no-underline' }
          ${selected ? 'text-black':'text-slate-500'}
        `}>
            <div>
                <Icon size={23} />
            </div>
            <div className="text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox;