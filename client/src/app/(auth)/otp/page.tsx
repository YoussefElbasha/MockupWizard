"use client";
// import ArrowBackIcon from "@/icons/arrow-back-outline.svg";
import toast from "react-hot-toast";

import OtpInput from "@/app/components/auth-components/otp";
import Button from "@/app/components/auth-components/Button";
import { motion } from "framer-motion";

interface OtpProps {
  email: string;
}

const page = ({ email }: OtpProps) => {
  const handleResubmission = async () => {
    try {
      console.log("resend otp");
      // await sendOtp({ email: email });
    } catch (errors) {
      toast.error("somethingWentWrong");
    }
  };

  return (
    <div className="bg-[#14162E] m-auto min-h-screen flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.25 }}
        className="flex flex-col items-center justify-center h-screen gap-4"
      >
        <p className="text-3xl font-bold text-center">Email Verification</p>
        <p className="text-lg font-medium text-center w-full">
          <span className="text-neutral-500">
            Enter below the 4 digits one-time password we sent to{" "}
          </span>
          <span className="text-secondary">{"test@gmail.com"}</span>
          <span className="text-neutral-400 ">. </span>
        </p>

        <OtpInput email={"test@gmail.com"} />
        <div className="flex flex-col items-center justify-center">
          <div className="absolute z-10">
            <button
              className="flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-600"
              onClick={handleResubmission}
            >
              Resend OTP
            </button>
          </div>
        </div>
        <motion.div
          initial={{ top: "21%", left: "6%", x: "0%", y: "0%", opacity: 1 }}
          animate={{ top: "20%", left: "36%", x: "0%", y: "0%", opacity: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
          className="absolute z-0"
        >
          <div className="w-60 h-60 bg-[#DDA82A] rounded-full blur-3xl opacity-50" />
        </motion.div>
        <motion.div
          initial={{ top: "57%", left: "13%", x: "0%", y: "0%", opacity: 1 }}
          animate={{ top: "57%", left: "47%", x: "0%", y: "0%", opacity: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
          className="absolute z-0"
        >
          <div className="w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-50" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default page;
