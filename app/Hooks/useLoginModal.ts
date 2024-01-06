import {create} from 'zustand';

interface useLoginModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useLoginModal=create<useLoginModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useLoginModal;