'use client';

import useLoginModal from "@/app/Hooks/useLoginModal";
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
import useRegisterModal from "@/app/Hooks/useRegisterModal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
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
        }
    })
    
    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

        axios.post('/api/login',data)
        .then(()=>{
            toast.success('Successfully logged in.',{
                icon:'😊'
            })
            loginModal.onClose();
        })
        .catch((error)=>{
            toast.error("Something went wrong.",{
                icon:'😟'
            })
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }
    const toggle=useCallback(()=>{
        registerModal.onOpen();
        loginModal.onClose();
    },[])
    const bodyContent = (
        <div>
            <Heading
              title="Welcome back to Airbnb"
              subtitle="Login to your account"
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
                 onClick={()=>signIn('google')}
                />
                <Button 
                 icon={AiFillGithub}
                 outline
                 label="Continue with github"
                 onClick={()=>signIn('github')}
                />
            </div>
            <div className="flex flex-row justify-center ">
                <div className="pr-2 text-gray-500">New to Airbnb? </div>
                <div 
                 onClick={toggle}
                 className="cursor-pointer hover:underline underline-offset-1"
                >
                    Create an account
                </div>
            </div>
        </div>
    )
    
    return(
        <div>
            <Modal
              title="Login"
              actionLabel={"Continue"}
              isOpen={loginModal.isOpen}
              onClose={loginModal.onClose}
              onSubmit={handleSubmit(onSubmit)}
              disabled={isLoading}
              body={bodyContent}
              footer={footerContent}
            />
        </div>
    )
}

export default LoginModal;