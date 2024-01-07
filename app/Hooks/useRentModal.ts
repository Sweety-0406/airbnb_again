import {create} from 'zustand';

interface useRentModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useRentModal=create<useRentModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useRentModal;