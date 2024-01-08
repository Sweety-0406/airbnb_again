'use client'

import useRentModal from "@/app/Hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { useState } from "react";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValue, useForm } from "react-hook-form";

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}
const RentModal=()=>{
    const rentModal = useRentModal();
    const[steps,setSteps] = useState(STEPS.CATEGORY)

    const{
        register,
        handleSubmit,
        watch,
        formState:{
            errors,
        },
        reset
    }=useForm<FieldValues>({
        defaultValues:{
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            price:1,
            location:null,
            category:'',
            imageSrc:'',
            title:'',
            description:''
        }
    })

    var bodyContent = (
        <div>
            <Heading
              title="Which of these best describes your place?"
              subtitle="Pick a category"
            />
            <div className="
               grid
               grid-cols-1
               md:grid-cols-2
               max-h-[50vh]
               overflow-y-auto
            ">
                {categories.map((item)=>(
                    <CategoryInput 
                     label={item.label}
                     icon={item.icon}
                     onClick={()=>{}}
                    />
                ))}
            </div>
        </div>
    )

    return (
        <div>
            <Modal 
              title="Airbnb your home !"
              isOpen = {rentModal.isOpen}
              onClose={rentModal.onClose}
              onSubmit={()=>{}}
              actionLabel="Continue"
              body={bodyContent}
            />
        </div>
    )
}

export default RentModal;