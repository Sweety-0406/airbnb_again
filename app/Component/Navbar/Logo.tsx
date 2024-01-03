'use client';

import Image from "next/image";
const Logo=()=>{
    return(
        <div className="mx-3">
            <Image 
              width='50'
              height='50'
              src="/images/logo.png"
              alt="Logo" />
              
        </div>
    )
}

export default Logo;