'use client';

import qs from 'query-string';
import useSearchModal from '@/app/Hooks/useSearchModal';
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import SelectCountry, { CountrySelectValue } from '../Inputs/SelectCountry';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../Inputs/Calendar';
import Counter from '../Inputs/Counter';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

enum STEPS{
    LOCATION = 0,
    DATE = 1,
    PRICE = 2,
    INFO = 3
}
const SearchModal = ()=>{
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [location,setLocation] = useState<CountrySelectValue>()
    const [step , setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate : new Date(),
        endDate : new Date(),
        key : 'selection'
    })
    const [price,setPrice] = useState(1);
    const t = useTranslations("searchForm")
    const b = useTranslations("button")    

    const Map = useMemo(()=>dynamic(()=>import('../Map'), {
        ssr : false,
    }),[])

    const onBack = useCallback(()=>{
        setStep((value) => value-1);
    },[]);

    const onNext = useCallback(()=>{
        setStep((value)=>value+1);
    },[])

    const onSubmit = useCallback(async ()=>{
        if(step !== STEPS.INFO){
            return onNext();
        }
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery:any ={
            ...currentQuery,
            locationValue : location?.value,
            bathroomCount,
            roomCount,
            guestCount,
            price
        } 
        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url : '/',
            query : updatedQuery
        },{skipNull : true})

        setStep(STEPS.LOCATION);
        setRoomCount(1);
        setBathroomCount(1);
        setGuestCount(1);
        setDateRange({
            startDate : new Date(),
            endDate : new Date(),
            key : 'selection'
        });
        setPrice(1)
        searchModal.onClose();
        router.push(url);

    },[
        step,
        bathroomCount,
        roomCount,
        guestCount,
        location,
        dateRange,
        price,
        onNext,
        params,
        router,
        searchModal
    ])

    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO){
            return b("search");
        }
        return  b("next")
    },[step]);

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.LOCATION){
            return undefined;
        }
        return  b("back");
    },[step])

    let bodyContent =(
       <div className='
         flex
         flex-col
         gap-8
       '>
        <Heading 
          title={t("locationTitle")}
          subtitle={t("locationSubtitle")}
        />
        <div className='z-50'>
            <SelectCountry 
            value={location}
            onChange={(value)=>
                setLocation(value as CountrySelectValue)
            }
            />
        </div>
        <hr />
        <div className='z-10'>
            <Map
            center={location?.latlng} 
            />
        </div>
       </div>
    )

    if(step === STEPS.DATE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                  title={t("dateTitle")}
                  subtitle={t("dateSubtitle")}
                />
                <div className='flex justify-center'>
                <Calendar 
                  value={dateRange}
                  onChange={(value)=>setDateRange(value.selection)}
                />
                </div>
            </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent = (
            <div className='flex flex-col '>
                <Heading 
                  title={t("priceTitle")}
                  subtitle={t("priceSubtitle")}
                />
                <Input
                    className='mt-4'
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col '>
                <Heading 
                  title={t("infoTitle")}
                  subtitle={t("infoSubtitle")}
                />
                <Counter 
                  title={t("guest")}
                  subtitle={t("GDes")}
                  value={guestCount}
                  onChange={(value)=>setGuestCount(value)}
                />
                <Counter 
                  title={t("room")}
                  subtitle={t("RDes")}
                  value={roomCount}
                  onChange={(value)=>setRoomCount(value)}
                />
                <Counter 
                  title={t("bathroom")}
                  subtitle={t("BDes")}
                  value={bathroomCount}
                  onChange={(value)=>setBathroomCount(value)}
                />
            </div>
        )
    }

    return(
        <Modal
          isOpen={searchModal.isOpen}
          onClose={searchModal.onClose}
          onSubmit={onSubmit}
          title = {t("head")}
          actionLabel={actionLabel}
          secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
          secondaryActionLabel={secondaryActionLabel}
          body={bodyContent}
        />
    )
}

export default SearchModal; 