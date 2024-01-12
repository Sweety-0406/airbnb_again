'use client';

import useCountries from '@/app/Hooks/useCountries';
import Select from 'react-select'

export type  CountrySelectValue={
    flag:string,
    latlng:number[],
    region:string,
    value:string,
    label:string
}

interface SelectCountryProps{
    value:CountrySelectValue,
    onChange:(value:CountrySelectValue)=>void
}

const SelectCountry:React.FC<SelectCountryProps>=({
    value,
    onChange
})=>{
    const {getAll} = useCountries();
    return (
        <div className='z-50'>
            <Select 
              placeholder='Anywhere'
              options={getAll()}
              isClearable
              value={value}
              onChange={(value)=>onChange(value as CountrySelectValue)}
              formatOptionLabel={(option:any)=>(
                <div className='flex flex-row gap-3 '>
                    <div>{option.flag}</div>
                    <div className='text-black text-md'>
                        {option.label},
                        <span className='ml-2 text-gray-400'>{option.region}</span>
                    </div>
                </div>   
              )}
              classNames={{
                control:()=>'p-2 border-2',
                input:()=>'text-lg',
                option:()=>'text-lg'
              }}
              theme={(theme)=>({
                ...theme,
                borderRadius:6,
                colors:{
                    ...theme.colors,
                    primary:'black',
                    primary25:'#ffe4e6'
                }
              })}
            />
            
        </div>
    )
}

export default SelectCountry;