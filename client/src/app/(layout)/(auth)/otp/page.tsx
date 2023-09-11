"use client";
import toast from "react-hot-toast";
import OtpInput from "@/app/components/auth-components/otp";
import { motion } from "framer-motion";
import api from "../../../../../util/Axios";
import { handleApiError } from "../../../../../util/errorHandling";

interface PageProps {
  searchParams: {
    email: string;
  };
}

const Page = ({ searchParams }: PageProps) => {
  const { email } = searchParams;
  const handleResubmission = async () => {
    try {
      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/otp`, {
        email,
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="bg-background m-auto min-h-screen flex flex-col items-center justify-center relative">
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
          <span className="text-secondary">{email}</span>
          <span className="text-neutral-400 ">. </span>
        </p>

        <OtpInput email={email} />
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
          <div className="w-60 h-60 bg-secondary rounded-full blur-3xl opacity-50" />
        </motion.div>
        <motion.div
          initial={{ top: "57%", left: "13%", x: "0%", y: "0%", opacity: 1 }}
          animate={{ top: "57%", left: "47%", x: "0%", y: "0%", opacity: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
          className="absolute z-0"
        >
          <div className="w-60 h-60 bg-primary rounded-full blur-3xl opacity-50" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
