'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
const Logo=()=>{
    const router = useRouter()
    const mainPage = useCallback(()=>{ 
        router.push('/')
    },[router])
    return(
        <div className="mr-3 cursor-pointer " onClick={mainPage}>
            {/* <Image
              width='90'
              height='90'
              src="/images/logo.png"
              alt="Logo" /> */}
            <Image
              width='50'
              height='50'
              src="/images/logo2.png"
              alt="Logo" />
              
        </div>
    )
}

export default Logo;