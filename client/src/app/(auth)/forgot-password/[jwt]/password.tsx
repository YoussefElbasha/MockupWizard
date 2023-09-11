"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../../../util/Axios";
import { useRouter } from "next/navigation";

const Password = ({ jwt }: { jwt: string }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (password.length === 0) return toast.error("Password is required");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters long");

    try {
      setIsLoading(true);

      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/reset`,
        {
          password,
          jwt,
        }
      );

      toast.success("Password reset successfully");
      router.push("/sign-in");
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs">
          Password
          <span className="text-red-500">*</span>
        </label>
        <input
          placeholder="Enter password"
          type="password"
          className="focus:outline-none p-3 pr-10 w-full h-full bg-white rounded text-xs text-[#667085]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="p-3 text-xs font-semibold text-white transition-colors duration-200 rounded bg-primary hover:bg-primary/70 disabled:bg-gray-300/40"
        disabled={isLoading}
        onClick={handlePasswordReset}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
};

export default Password;
