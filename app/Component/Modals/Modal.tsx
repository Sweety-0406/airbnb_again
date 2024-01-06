'use client';

import {IoMdCloseCircleOutline} from 'react-icons/io'
import Button from '../Button';
import { useCallback } from 'react';

interface ModalProps{
    isOpen:boolean
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
    onClose,
    onSubmit,
    title ,
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
    disabled,
    body,
    footer
})=>{
    const closeHandler = useCallback(()=>{
      setTimeout(()=>{
         onClose();
      },300)
    },[onClose]);

    const submitHandler=useCallback(()=>{
      if(disabled){
        return;
      }
      onSubmit();
    },[onSubmit])

    const secondaryActionHandler = useCallback(()=>{
      if(!secondaryAction){
        return null;
      }
      secondaryAction();
    },[secondaryAction])

    if(!isOpen){
      return null;
    }
    return(
        <div className="
        bg-neutral-800/70
        flex
        justify-center
        items-center
        fixed
        inset-0
        z-50 
        ">
          <div className="
            transition
            duration-300
            bg-white
            w-full
            sm:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            sm:h-auto
            rounded-xl
          ">
              {/* content */}
              <div className="
               flex
               flex-col
               mx-2
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
                    onClick={closeHandler}
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
                <div className='relative pt-6 px-6 pb-6 mx-2'>
                    {body}
                </div>
                {/* Footer */}
                <div className='flex flex-col justify-center items-center  mx-2 mb-4'>
                  <div className='
                    flex 
                    flex-row
                    justify-between
                    w-full
                    mb-4
                  '>
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        label={secondaryActionLabel}
                        onClick={secondaryActionHandler}
                        disabled={disabled}
                        outline={true}
                      />
                    )}
                    <Button
                     label={actionLabel}
                     onClick={submitHandler} 
                     disabled={disabled}
                     outline={false}
                    />
                  </div>
                  {footer}
                </div>
              </div>
          </div>
        </div>
    )
}

export default Modal;