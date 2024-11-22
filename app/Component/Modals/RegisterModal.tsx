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
import { useTranslations } from "next-intl";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading]=useState(false);
    const t  = useTranslations("registerPage")

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
            loginModal.onOpen()
        })
    }
    const toggle=useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[registerModal,loginModal])
    const bodyContent = (
        <div>
            <Heading
              title={t("title")}
              subtitle={t("subTitle")}
             />
             <Input 
               id="email"
               label={t("email")}
               type={"text"}
               register={register}
               errors={errors}
               required
             />
             <Input 
               id="name"
               label={t("username")}
               type={"text"}
               register={register}
               errors={errors}
               required
             />
             <Input 
               id="password"
               label={t("password")}
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
                 label={t("google")}
                 onClick={()=>signIn('google')}
                />
                <Button 
                 icon={AiFillGithub}
                 outline
                 label={t("github")}
                 onClick={()=>signIn('github')}
                />
            </div>
            <div className="flex flex-row justify-center ">
                <div className="pr-2 text-gray-500">{t("haveAcc")} </div>
                <div 
                 onClick={toggle}
                 className="cursor-pointer hover:underline underline-offset-1"
                >
                    {t("login")}
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