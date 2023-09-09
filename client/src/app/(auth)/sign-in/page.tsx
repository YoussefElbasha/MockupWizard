"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import api from "../../../../util/Axios";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

import AuthCanvas from "@/app/components/auth-components/AuthCanvas";
import Form from "@/app/components/auth-components/Form";
import { handleApiError } from "../../../../util/errorHandling";

interface loginData {
  email: string;
  password?: string;
}

const Page = () => {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [withOTP, setWithOTP] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: withOTP
      ? yup.string()
      : yup.string().required("Password is required").min(8).max(32),
  });

  const toggleHidePassword = () => {
    setPasswordType((prev: string) => {
      if (prev === "password") return "text";

      return "password";
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const loginUser = async (url: string, { arg }: { arg: loginData }) => {
    try {
      if (withOTP) url += "/otp";
      const response = await api.post(url, arg);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  };

  const { data, trigger, isMutating, error } = useSWRMutation(
    `${process.env.SERVER_URL}auth/login`,
    loginUser
  );

  const onSubmitHandler = async (userData: loginData) => {
    const loadingPromise = toast.loading("Logging in...");
    try {
      await trigger(userData);
      toast.dismiss(loadingPromise);
      if (withOTP) {
        router.push(`/otp?email=${userData.email}`);
      } else {
        toast.success("Login success.");
        router.push("/");
        mutate("user-info");
      }
    } catch (error: any) {
      toast.dismiss(loadingPromise);
      handleApiError(error);
    }
  };

  return (
    <>
      <motion.div
        // className="absolute top-1/2 left-1/4 transform translate-y-1/4 -translate-x-3/4"
        initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 1 }}
        animate={{ top: "21%", left: "6%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.1, delay: 0 }}
        className="absolute"
      >
        <div className="w-60 h-60 bg-secondary rounded-full blur-3xl opacity-50" />
      </motion.div>
      {/* <div className="absolute top-1/8 left-[6%] transform -translate-y-1/4 bg-red-700">
        <div className="w-60 h-60 bg-[#DDA82A] rounded-full blur-3xl opacity-0" />
      </div> */}

      <motion.div
        // className="absolute top-1/2 left-1/4 transform translate-y-1/4 -translate-x-3/4"
        initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 1 }}
        animate={{ top: "57%", left: "13%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.1, delay: 0 }}
        className="absolute"
      >
        <div className="w-60 h-60 bg-primary rounded-full blur-3xl opacity-50" />
      </motion.div>
      {/* <div className="absolute top-1/2 left-1/4 transform translate-y-1/4 -translate-x-3/4">
        <div className="w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-0" />
      </div> */}
      <div className="flex flex-grow flex-col items-center justify-center md:flex-row z-10">
        <div className="p-10 text-white flex-grow justify-center flex flex-col items-start gap-10">
          <div>
            <h1 className="text-4xl font-bold">Sign in to design</h1>
            <h1 className="text-4xl font-bold">you own product</h1>
          </div>
          <div className="font-semibold">
            <p>{"If you don't have an account"}</p>
            <p>
              you can{" "}
              <span className="text-primary hover:text-indigo-500">
                <Link href="/signup">Register here!</Link>
              </span>
            </p>
          </div>
        </div>
        <AuthCanvas />
        <Toaster />
        <Form
          label="Sign in"
          onSubmit={handleSubmit(onSubmitHandler)}
          register={register}
          errors={errors}
          toggleHidePassword={toggleHidePassword}
          passwordType={passwordType}
          isMutating={isMutating}
          withOTP={withOTP}
          setWithOTP={setWithOTP}
        />
      </div>
    </>
  );
};

export default Page;
