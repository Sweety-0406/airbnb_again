'use client';
import {CldUploadWidget} from 'next-cloudinary';
import { useCallback, useEffect, useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import { Button } from '@/components/ui/button';

declare  global {
    var cloudinary :any
}
interface UploadVideoProps{
    value: string[],
    onChange : (value:string)=>void
}
const UploadVideo:React.FC<UploadVideoProps>=({
    value,
    onChange
})=>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
    
    const submitHandle = useCallback((result: any) => {
      if (Array.isArray(result.info)) {
        const newVideos = result.info.map((video: any) => video.secure_url);
        onChange(newVideos);
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
                <video 
                src={url}
                className='object-cover fill'
                controls
                autoPlay
                muted
                >
                  video
                </video>
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
                  Upload an video
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
    )
    
}

export default UploadVideo