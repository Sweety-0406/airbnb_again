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
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import UploadVideo from "../Inputs/UploadVideo";
import { useTranslations } from "next-intl";


enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const formSchema = z.object({
    sightImages: z.object({ url: z.string()}).array(),  
    sightVideos: z.object({ url: z.string()}).array(),  
})

const RentModal=()=>{
    const router = useRouter();
    const rentModal = useRentModal();
    const[steps,setSteps] = useState(STEPS.CATEGORY)
    const [isLoading,setIsLoading]=useState(false);
    const a = useTranslations("airbnbForm")
    const c = useTranslations("category")
    const l = useTranslations("location")
    const i = useTranslations("info")
    const p = useTranslations("photo")
    const d = useTranslations("description")
    const pr = useTranslations("price")
    const b  = useTranslations("button")

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
            images:[],
            videos:[],
            title:'',
            description:''
        }
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            sightImages:[],
            sightVideos:[]
        }
        
    })
    const onSubmitForImagesAndVideos = async (values: z.infer<typeof formSchema>)=>{
        setCustomValue('images', values.sightImages);
        setCustomValue('videos', values.sightVideos);
    }

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')

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
              title={c("title")}
              subtitle={c("subTitle")}
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
                  title={l("title")}
                  subtitle={l("subTitle")}
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
                 title={i("title")}
                 subtitle={i("subTitle")}
                />
                <Counter 
                  title={i("guest")}
                  subtitle={i("GDes")}
                  value={guestCount}
                  onChange={(value)=>setCustomValue('guestCount',value)}
                />
                <hr />
                <Counter 
                  title={i("room")}
                  subtitle={i("RDes")}
                  value={roomCount}
                  onChange={(value)=>setCustomValue('roomCount',value)}
                />
                <hr />
                <Counter 
                  title={i("bathroom")}
                  subtitle={i("BDes")}
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
                 title={p("title")}
                 subtitle={p("subTitle")}
               /> 
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmitForImagesAndVideos)} className="space-y-8 ">
                    <FormField 
                    control={form.control}
                    name="sightImages"
                    render={({field})=>(
                            <FormItem>
                                <FormControl className="w-64">
                                
                                <UploadImage 
                                    value={field.value.map((image) => image.url)} 
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                />
                                </FormControl>
                                <FormMessage />   
                            </FormItem>
                    )}
                    />
                    <FormField 
                    control={form.control}
                    name="sightVideos"
                    render={({field})=>(
                            <FormItem>
                                <FormControl className="w-64">
                                
                                <UploadVideo 
                                    value={field.value.map((video) => video.url)} 
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                />
                                </FormControl>
                                <FormMessage />   
                            </FormItem>
                    )}
                    />
                    <Button className="mt-6" type="submit" >{p("confirm")}</Button>
                    </form>
                </Form>
            </div>
        )
    }

    if(steps === STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col">
                <Heading 
                  title={d("title")}
                  subtitle={d("subTitle")}
                />
                <div className="mb-8">
                    <Input 
                    id="title"
                    label={d("tit")}
                    register={register}
                    errors={errors}
                    />
                </div>
                <hr />
                <div className="mt-4">
                    <Input 
                    id="description"
                    label={d("des")}
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
                  title={pr("title")}
                  subtitle={pr("subTitle")}
                />
                <div>
                    <Input
                      id="price"
                      label={pr("amount")}
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
                title={a("title")}
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
                secondaryActionLabel={steps === STEPS.CATEGORY? undefined : b("back")}
                body={bodyContent} 
                actionLabel={steps === STEPS.PRICE ? b("submit") : b("continue")}            />
        </div>
    )
}

export default RentModal;