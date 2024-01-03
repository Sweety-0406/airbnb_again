'use client';

import {IoMdCloseCircleOutline} from 'react-icons/io'
interface ModalProps{
    isOpen:boolean
    onOpen: ()=>void;
    onClose: ()=>void;
    onSubmit: ()=>void;
    title?:string;
    actionLabel: string;
    secondaryActionLabel?: string;
    secondaryAction?: ()=>void;
    disabled?: boolean;
    body?: React.ReactElement 
    footer?: React.ReactElement 
}
const Modal:React.FC<ModalProps>=({
    isOpen,
    onOpen,
    onClose,
    onSubmit,
    title = "login",
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
    disabled,
    body,
    footer
})=>{
    return(
        <div className="
        bg-neutral-800/70
        flex
        justify-center
        items-center
        fixed
        inset-0
        // overflow-x-hidden
        // overflow-y-auto
        z-50 
        ">
          <div className="
            transition
            duration-300
            bg-white
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            md:h-auto
            rounded-xl
          ">
              {/* content */}
              <div className="
               flex
               flex-col
               
              ">
                {/* Header */}
                <div className='
                 flex
                 items-center
                 justify-center
                 relative
                 py-5
                 md:py-4
                '>
                    <button 
                    onClick={()=>{}}
                    className='
                      left-9 
                      absolute
                      cursor-pointer
                    '>
                      <IoMdCloseCircleOutline size={30}/>
                    </button>
                    <div className='text-xl font-semibold'>
                        {title}
                    </div>
                    
                </div>
                <hr />
                {/* Body */}
                <div className='relative pt-6 px-6'>
                    {body}
                </div>
                {/* Footer */}
                <div></div>
              </div>
          </div>
        </div>
    )
}

export default Modal;