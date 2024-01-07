'use client';

import useRegisterModal from "@/app/Hooks/useRegisterModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import {toast} from "react-hot-toast";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
import {FcGoogle} from 'react-icons/fc';
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/Hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading]=useState(false);

    const{
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
            name:''
        }
    })
    
    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

        axios.post('/api/register',data)
        .then(()=>{
            toast.success('Successfully registered.',{
                icon:'😊'
            })
            registerModal.onClose();
        })
        .catch((error)=>{
            toast.error(error,{
                icon:'😟'
            })
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }
    const toggle=useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[registerModal,loginModal])
    const bodyContent = (
        <div>
            <Heading
              title="Welcome to Airbnb"
              subtitle="Create an account"
             />
             <Input 
               id="email"
               label="Email"
               type={"text"}
               register={register}
               errors={errors}
               required
             />
             <Input 
               id="name"
               label="Username"
               type={"text"}
               register={register}
               errors={errors}
               required
             />
             <Input 
               id="password"
               label="Password"
               type={"password"}
               register={register}
               errors={errors}
               required
             />
        </div>
    )

    const footerContent=(
        <div className="w-full ">
            <hr />
            <div className="mr-12 ">
                <Button 
                 icon={FcGoogle}
                 outline
                 label="Continue with google"
                 onClick={()=>{}}
                />
                <Button 
                 icon={AiFillGithub}
                 outline
                 label="Continue with github"
                 onClick={()=>signIn('github')}
                />
            </div>
            <div className="flex flex-row justify-center ">
                <div className="pr-2 text-gray-500">Already have an account? </div>
                <div 
                 onClick={toggle}
                 className="cursor-pointer hover:underline underline-offset-1"
                >
                     Log in
                </div>
            </div>
        </div>
    )

    return(
        <div>
            <Modal
              title="Register"
              actionLabel={"Continue"}
              isOpen={registerModal.isOpen}
              onClose={registerModal.onClose}
              onSubmit={handleSubmit(onSubmit)}
              disabled={isLoading}
              body={bodyContent}
              footer={footerContent}
            />
        </div>
    )
}

export default RegisterModal;