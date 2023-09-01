"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { motion } from "framer-motion";
import api from "../../../../util/Axios";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

import AuthCanvas from "@/app/components/auth-components/AuthCanvas";
import Navbar from "@/app/components/navbar-components/Navbar";
import Form from "@/app/components/auth-components/Form";

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
      const response = await api.post(url, arg);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  };

  const { data, trigger, isMutating } = useSWRMutation(
    "http://api.app.localhost:4000/auth/register",
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
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else if (err.request) {
        toast.error("Network error");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {/* <Navbar
        navLinks={[
          { href: "/dashboard", name: "Dashboard" },
          { href: "/", name: "Home" },
          { href: "/account", name: "Account" },
        ]}
      /> */}
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
        <Form
          label="Create Account"
          signup={true}
          onSubmit={handleSubmit(onSubmitHandler)}
          register={register}
          errors={errors}
          toggleHidePassword={toggleHidePassword}
          passwordType={passwordType}
          isMutating={isMutating}
          withOTP={false}
          setWithOTP={undefined}
        />
        <Toaster />
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
                <Link href="/sign-in">sign in here!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
