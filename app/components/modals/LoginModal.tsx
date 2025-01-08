"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
// import { register } from "module";
import Modal from "./Modal";
// import { on } from "events";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

import {signIn} from "next-auth/react";

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback)=>{
      setIsLoading(false);

      if(callback?.ok){
        toast.success("Logged in successfully");
        router.refresh();
        loginModal.onClose();
      }
      if(callback?.error){
        toast.error(callback.error);
      }
    })
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  },[loginModal, registerModal]);


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log In to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {/* <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center my-4 font-light">
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>First time visiting NestQuest?</div>
          <div
            onClick={toggle}
            className="text-[#D5B263] cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log In"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
