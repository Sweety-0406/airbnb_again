import {create} from 'zustand';

interface useRegisterModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useRegisterModal=create<useRegisterModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useRegisterModal;