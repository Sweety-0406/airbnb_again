'use client'

import useRentModal from "@/app/Hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { useCallback, useMemo, useState } from "react";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SelectCountry from "../Inputs/SelectCountry";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import Input from "../Inputs/Input";
import UploadImage from "../Inputs/UploadImage";

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}
const RentModal=()=>{
    const router = useRouter();
    const rentModal = useRentModal();
    const[steps,setSteps] = useState(STEPS.CATEGORY)
    const [isLoading,setIsLoading]=useState(false);

    const{
        register,
        handleSubmit,
        watch,
        setValue,
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

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(()=>dynamic(()=>import('../Map'),{
       ssr:false
    }),[location])

    const setCustomValue=(id:string,value:any)=>{
        setValue(id,value,{
          shouldDirty:true,
          shouldTouch:true,
          shouldValidate:true,
        })  
    } 
    
    const onNext =()=>{
        setSteps((value) => value+1)
    }

    const onBack = ()=>{
        setSteps((value) => value-1)
    }

    const onSubmit: SubmitHandler<FieldValues> =useCallback((data)=>{
        if(steps != STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);
        axios.post('/api/listing',data)
        .then(()=>{
            toast.success("Listings are successfully created.")
            router.refresh();
            reset();
            setSteps(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error("Something went wrong")
        })
        .finally(()=>{
            setIsLoading(false);
            rentModal.onClose()
        })
    },[steps,router])

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
                    <div key={item.label} className="col-span-1">
                    <CategoryInput
                        onClick={(category)=>setCustomValue('category',category)} 
                        label={item.label}
                        isSelected={category === item.label}
                        icon={item.icon}
                    />
                </div>
                ))}
            </div>
        </div>
    )


    if(steps === STEPS.LOCATION){
        bodyContent=(
            <div className="flex flex-col gap-8  ">
                <Heading
                  title="Where is your place located?"
                  subtitle="Help guests to find you!"
                />
                <div className="z-40">
                <SelectCountry
                  value={location}
                  onChange={(value)=>setCustomValue('location',value)}
                 />
                </div>
                 <div className="z-10">
                 <Map 
                   center={location?.latlng}
                 />
                 </div>
            </div>
        )
    }

    if(steps === STEPS.INFO){
        bodyContent = (
            <div>
                <Heading
                 title="Share some basic info about you"
                 subtitle="What amenities do you have ?"
                />
                <Counter 
                  title="Guests"
                  subtitle="How many guests do you allow?"
                  value={guestCount}
                  onChange={(value)=>setCustomValue('guestCount',value)}
                />
                <hr />
                <Counter 
                  title="Rooms"
                  subtitle="How many rooms do you have?"
                  value={roomCount}
                  onChange={(value)=>setCustomValue('roomCount',value)}
                />
                <hr />
                <Counter 
                  title="Bathrooms"
                  subtitle="How many bathrooms do you have?"
                  value={bathroomCount}
                  onChange={(value)=>setCustomValue('bathroomCount',value)}
                />
              
            </div>
        )
    }

    if(steps === STEPS.IMAGES){
        bodyContent = (
            <div>
               <Heading 
                  title="Add a photo of your place"
                  subtitle="Show guests what your place looks like!"
               /> 
               <UploadImage 
                 value={imageSrc}
                 onChange={(value)=>setCustomValue('imageSrc',value)}
               />
            </div>
        )
    }

    if(steps === STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col">
                <Heading 
                  title="How would you describe your place?"
                  subtitle="Short and sweet works best!"
                />
                <div className="mb-8">
                    <Input 
                    id="title"
                    label="Title"
                    register={register}
                    errors={errors}
                    />
                </div>
                <hr />
                <div className="mt-4">
                    <Input 
                    id="description"
                    label="Description"
                    register={register}
                    errors={errors}
                    />
                </div>
            </div>
        )
    }

    if(steps === STEPS.PRICE){
        bodyContent=(
            <div>
                <Heading 
                  title="Now, set your price"
                  subtitle="How much do you charge per night?"
                />
                <div>
                    <Input
                      id="price"
                      label="Price"
                      register={register}
                      errors={errors}
                      type="number"
                      formatPrice
                      required
                     />
                </div>
            </div>
        )
    }

    return (
        <div>
            <Modal 
                title="Airbnb your home !"
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
                secondaryActionLabel={steps === STEPS.CATEGORY? undefined : 'Back'}
                body={bodyContent} 
                actionLabel={steps === STEPS.PRICE ? 'Submit' : 'Continue'}            />
        </div>
    )
}

export default RentModal;