"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { AxiosError } from "axios";
import api from "../../../../util/Axios";
import toast from "react-hot-toast";

interface OtpInputProps {
  email: string | null;
}

const OtpInput = ({ email }: OtpInputProps) => {
  const [otp, setOtp] = useState("");
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submitOTP = useCallback(async () => {
    if (!otp || isSubmitting) return;

    try {
      console.log("otp", otp);
      setIsSubmitting(true);
      await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/otpverify`, {
        code: otp,
        email: email,
      });
      router.push("/dashboard");
      mutate("user-info");
    } catch (e) {
      const error = (e as AxiosError).response?.data;
      const message =
        (error as { message: string })?.message || "Something went wrong";
      toast.error(message);
      setOtp("");
    } finally {
      setOtp("");
      setIsSubmitting(false);
    }
  }, [email, isSubmitting, otp, router]);

  useEffect(() => {
    if (otp.length === 4) {
      submitOTP();
    }
  }, [otp, submitOTP]);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target;
    const value = input.value;

    // Only allow numbers from 0 to 9
    const validValue = value.replace(/[^0-9]/g, "");

    setOtp((prevOtp) => {
      const newOtp =
        prevOtp.substring(0, index) + validValue + prevOtp.substring(index + 1);
      return newOtp;
    });

    if (
      value.length === input.maxLength &&
      index < inputRefs.current.length - 1
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const keyPressed = e.key;
    const isNumberKey = /^[0-9]$/.test(keyPressed);

    if (!isNumberKey && otp.charAt(index) === "") {
      e.preventDefault();
    }

    if (keyPressed === "Backspace" && index > 0 && otp.charAt(index) === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        <div className="flex space-x-2">
          <label htmlFor="otp-1" className="sr-only">
            OTP First Digit
          </label>
          <input
            ref={(el) => (inputRefs.current[0] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 text-black rounded-md disabled:animate-pulse"
            value={otp.charAt(0) || ""}
            disabled={isSubmitting}
            onChange={(e) => handleInputChange(0, e)}
            onKeyDown={(e) => handleKeyDown(0, e)}
            id="otp-1"
          />
          <label htmlFor="otp-2" className="sr-only">
            OTP Second Digit
          </label>
          <input
            ref={(el) => (inputRefs.current[1] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 text-black rounded-md disabled:animate-pulse"
            value={otp.charAt(1) || ""}
            disabled={isSubmitting}
            onChange={(e) => handleInputChange(1, e)}
            onKeyDown={(e) => handleKeyDown(1, e)}
            id="otp-2"
          />
          <label htmlFor="otp-3" className="sr-only">
            OTP Third Digit
          </label>
          <input
            ref={(el) => (inputRefs.current[2] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 text-black rounded-md disabled:animate-pulse"
            value={otp.charAt(2) || ""}
            disabled={isSubmitting}
            onChange={(e) => handleInputChange(2, e)}
            onKeyDown={(e) => handleKeyDown(2, e)}
            id="otp-3"
          />
          <label htmlFor="otp-4" className="sr-only">
            OTP Fourth Digit
          </label>
          <input
            ref={(el) => (inputRefs.current[3] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 text-black rounded-md disabled:animate-pulse"
            value={otp.charAt(3) || ""}
            disabled={isSubmitting}
            onChange={(e) => handleInputChange(3, e)}
            onKeyDown={(e) => handleKeyDown(3, e)}
            id="otp-4"
          />
        </div>
      </div>
    </div>
  );
};
export default OtpInput;
