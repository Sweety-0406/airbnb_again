'use client';
import {CldUploadWidget} from 'next-cloudinary';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image'

declare  global {
    var cloudinary :any
}
interface UploadImageProps{
    value: string,
    onChange : (value:string)=>void
}
const UploadImage:React.FC<UploadImageProps>=({
    value,
    onChange
})=>{
    const submitHandle = useCallback((result:any)=>{
        onChange(result.info.secure_url);
    },[onChange])
    return(
        <CldUploadWidget
         onUpload={submitHandle}
         uploadPreset='irldqoos'
         options={{
            maxFiles :1
         }}
        >
            {({open}) => {
                return (
                    <div 
                    onClick={()=>open?.()}
                    className='
                     relative
                     flex
                     flex-col
                     border-[3px]
                     p-20
                     border-dotted
                     justify-center
                     items-center
                     cursor-pointer
                    '>
                      <TbPhotoPlus size={30} />  
                      <div>
                        Click to upload images
                      </div>
                      {value && (
                        <div className='absolute inset-0 w-full h-full'>
                            <Image 
                             alt='Selected Image'
                             src={value}
                             fill
                             style={{objectFit:'cover'}}
                            />
                        </div>
                      )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default UploadImage