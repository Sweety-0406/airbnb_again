'use client';

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps{
   title?:string
   subtitle?:string
   showSet?:boolean
}

const EmptyState:React.FC<EmptyStateProps> =({
    title="No exact matches",
    subtitle="Try changing or removing some of your filters",
    showSet
})=>{
    const router = useRouter()
    return(
        <div className="
         h-[50vh]
         mt-44
         flex  
         flex-col
         justify-center
         items-center
        ">
           <Heading 
             center
             title={title}
             subtitle={subtitle}
           />
           <div className="w-48 mt-4 -ml-10">
            {showSet && (
                    <Button
                    outline
                    label="Remove all listings" 
                    onClick={()=>router.push('/')}
                />
            )}
           </div>

        </div>
    )
}

export default EmptyState