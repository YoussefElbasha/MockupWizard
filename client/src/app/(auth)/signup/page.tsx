"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthCanvas from "@/app/components/auth-components/AuthCanvas";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import Navbar from "@/app/components/auth-components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import Input from "@/app/components/auth-components/Input";
import Button from "@/app/components/auth-components/Button";
import OauthComponent from "@/app/components/auth-components/OauthComponent";

interface registerData {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required").min(3).max(20),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup.string().required("Password is required").min(8).max(32),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const page = () => {
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");

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

  const registerUser = async (url: string, { arg }: { arg: registerData }) => {
    try {
      const response = await axios.post(url, arg);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  };

  const { data, trigger, isMutating } = useSWRMutation(
    "http://localhost:4000/user/register",
    registerUser
  );

  const onSubmitHandler = async (userData: registerData) => {
    const loadingPromise = toast.loading("Registering...");
    try {
      await trigger(userData);
      toast.dismiss(loadingPromise);
      toast.success("Registered successfully.");
      router.push("/");
    } catch (err: any) {
      toast.dismiss(loadingPromise);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="bg-[#14162E] m-auto min-h-screen flex items-center justify-center relative">
      <motion.div
        // className="absolute top-1/8 left-2/3 transform -translate-y-1/2"
        initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 1 }}
        animate={{ top: "17%", left: "67%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.1, delay: 0 }}
        className="absolute"
      >
        <div className="w-60 h-60 bg-[#DDA82A] rounded-full blur-3xl opacity-50" />
      </motion.div>
      <motion.div
        // className="absolute top-1/2 left-3/4 transform "
        initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 1 }}
        animate={{ top: "50%", left: "75%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.1, delay: 0 }}
        className="absolute"
      >
        <div className="w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-50" />
      </motion.div>

      {/* <div className="absolute top-1/2 left-3/4 transform ">
        <div className="w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-50" />
      </div> */}
      <div className="flex flex-col items-center justify-center md:flex-row z-10">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-3 text-white py-10 px-24 font-bold">
            <div className="py-2 px-8">
              <h1 className="text-center text-lg mx-8">Create Account</h1>
            </div>
            <Input
              label="Username"
              placeholder="Enter a username"
              register={register}
              registerName="username"
              errors={errors}
              onClick={()=>{}}
            />
            <Input
              label="Email"
              placeholder="Enter email"
              register={register}
              registerName="email"
              errors={errors}
              onClick={()=>{}}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              register={register}
              registerName="password"
              errors={errors}
              onClick={toggleHidePassword}
              passwordType={passwordType}
              eyeIcon={true}
            />
            <Input
              label="Confirm Password"
              placeholder="Confirm password"
              register={register}
              registerName="confirmPassword"
              errors={errors}
              onClick={toggleHidePassword}
              passwordType={passwordType}
              eyeIcon={true}
            />
            <Toaster />
            <Button
              label="Sign up"
              isMutating={isMutating}
            />
            <OauthComponent />
          </div>
        </form>
        <AuthCanvas />
        <div className="p-10 text-white flex-grow justify-center flex flex-col items-start gap-10">
          <div>
            <h1 className="text-4xl font-bold">Unleash your</h1>
            <h1 className="text-4xl font-bold">product's potential!</h1>
          </div>
          <div className="font-semibold">
            <p>already have an account?</p>
            <p>
              you can{" "}
              <span className="text-[#4461F2] hover:text-indigo-500">
                <a href="/sign-in">sign in here!</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
