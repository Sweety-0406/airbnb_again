'use client';
import {CldUploadWidget} from 'next-cloudinary';
import { useCallback, useEffect, useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

declare  global {
    var cloudinary :any
}
interface UploadImageProps{
    value: string[],
    onChange : (value:string)=>void
}
const UploadImage:React.FC<UploadImageProps>=({
    value,
    onChange
})=>{
    const [isMounted, setIsMounted] = useState(false);
    const t = useTranslations("photo")

    useEffect(() => {
      setIsMounted(true);
    }, []);
    
    const submitHandle = useCallback((result: any) => {
      if (Array.isArray(result.info)) {
        const newImages = result.info.map((image: any) => image.secure_url);
        onChange(newImages);
      } else {
        onChange(result.info.secure_url);
      }
    }, [onChange]);

    if (!isMounted) {
      return null;
    }

    return ( 
        <div>
          <div className="mb-4 flex items-center gap-4">
            {Array.isArray(value) && value.map((url) => (
              <div key={url} className="relative w-[100px] h-[100px] rounded-md overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={url}
                />
              </div>
            ))}
          </div>
          <CldUploadWidget onUpload={submitHandle} uploadPreset="irldqoos">
            {({ open }) => {
              const onClick = () => {
                open();
              };
    
              return (
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={onClick}
                >
                  <TbPhotoPlus className="h-4 w-4 mr-2" />
                  {t("img")}
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
    )
    
}

export default UploadImage