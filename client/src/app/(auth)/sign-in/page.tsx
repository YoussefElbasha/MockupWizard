"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import AuthCanvas from "@/app/components/auth-components/AuthCanvas";
import EyeIcon from "@/app/icons/eye-outline.svg";
import EyeOffIcon from "@/app/icons/eye-off-outline.svg";
import CloseCircle from "@/app/icons/close-circle-outline.svg";
import Google from "@/app/icons/google.svg";
import Facebook from "@/app/icons/facebook.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import Navbar from "@/app/components/auth-components/Navbar";
import toast, { Toaster } from "react-hot-toast";

interface loginData {
  email: string;
  password: string;
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup.string().required("Password is required").min(8).max(32),
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

  const loginUser = async (url: string, { arg }: { arg: loginData }) => {
    try {
      const response = await axios.post(url, arg);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  };

  const { data, trigger, isMutating, error } = useSWRMutation(
    "http://localhost:4000/user/login",
    loginUser
  );

  const onSubmitHandler = async (userData: loginData) => {
    const loadingPromise = toast.loading("Logging in...");
    try {
      await trigger(userData);
      toast.dismiss(loadingPromise);
      toast.success("Login success.");
      router.push("/");
    } catch (err: any) {
      toast.dismiss(loadingPromise);
      toast.error(err.response.data);
    }
  };

  return (
    <div className="bg-[#14162E] m-auto min-h-screen flex flex-col items-center justify-center relative">
      <motion.div
        // className="absolute top-1/2 left-1/4 transform translate-y-1/4 -translate-x-3/4"
        initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 1 }}
        animate={{ top: "21%", left: "6%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.1, delay: 0 }}
        className="absolute"
      >
        <div className="w-60 h-60 bg-[#DDA82A] rounded-full blur-3xl opacity-50" />
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
        <div className="w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-50" />
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
            <p>If you don't have an account</p>
            <p>
              you can{" "}
              <span className="text-[#4461F2] hover:text-indigo-500">
                <a href="/signup">Register here!</a>
              </span>
            </p>
          </div>
        </div>
        <AuthCanvas />
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-2 text-white py-10 px-24 font-bold">
            <div className="py-2 px-8">
              <h1 className="text-center text-lg mx-8">Sign in</h1>
            </div>
            <label className="text-xs">Email*</label>
            <div className="relative">
              <input
                placeholder="Enter email"
                type="email"
                {...register("email")}
                className="focus:outline-none p-3 w-full h-full bg-white rounded text-xs text-[#4F555A]"
              />
              <span
                className="p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute"
                onClick={() => {}}
              >
                <CloseCircle className="w-3.5 text-[#4F555A]" />
              </span>
            </div>
            {errors.email && (
              <motion.p
                className="text-xs text-red-500 font-medium"
                {...framer_error}
              >
                {errors.email?.message}
              </motion.p>
            )}
            <label className="text-xs">Password*</label>
            <div className="relative">
              <input
                placeholder="Enter password"
                type={passwordType}
                {...register("password")}
                className="focus:outline-none p-3 w-full h-full bg-white rounded text-xs text-[#4F555A]"
              />
              <button
                type="button"
                className="p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute"
                onClick={toggleHidePassword}
              >
                {passwordType === "password" ? (
                  <EyeOffIcon className="w-3.5 text-[#4F555A]" />
                ) : (
                  <EyeIcon className="w-3.5 text-[#4F555A]" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                className="text-xs text-red-500 font-medium"
                {...framer_error}
              >
                {errors.password?.message}
              </motion.p>
            )}
            <Toaster />
            <button
              type="submit"
              disabled={isMutating}
              className={
                isMutating
                  ? "my-6 text-white bg-blue-100 rounded-lg p-3 text-sm shadow-lg shadow-blue-500/50"
                  : "my-6 hover:bg-indigo-500 transition ease-in-out duration-600 text-white bg-[#4461F2] rounded-lg p-3 text-sm shadow-lg shadow-blue-500/50"
              }
            >
              Sign in
            </button>
            <div>
              <div className="flex items-center justify-center gap-2">
                <hr className="w-16" />
                <p className="text-xs font-normal">Or continue with</p>
                <hr className="w-16" />
              </div>
              <div className="flex gap-10 justify-center my-8">
                <button
                  type="button"
                  className="px-8 py-2 bg-white rounded-xl text-black"
                >
                  <Facebook />
                </button>
                <button
                  type="button"
                  className="px-8 py-2 bg-white rounded-xl text-black"
                >
                  <Google />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
