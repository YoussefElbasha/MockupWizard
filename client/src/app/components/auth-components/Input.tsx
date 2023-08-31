import React from "react";
import EyeIcon from "@/app/icons/eye-outline.svg";
import EyeOffIcon from "@/app/icons/eye-off-outline.svg";
import CloseCircle from "@/app/icons/close-circle-outline.svg";
import { motion } from "framer-motion";

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

interface inputProps {
  label: string;
  placeholder: string;
  registerName: string;
  register: any;
  errors: any;
  eyeIcon?: boolean;
  onClick: any;
  passwordType?: string;
}

const Input = (props: inputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs">{props.label}*</label>
      <div className="relative">
        <input
          placeholder={props.placeholder}
          type={props.passwordType}
          {...props.register(props.registerName)}
          className="focus:outline-none p-3 w-full h-full bg-white rounded text-xs text-[#667085]"
        />
        {props.eyeIcon ? (
          <button
            type="button"
            className="p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute"
            onClick={() => props.onClick()}
          >
            {props.passwordType === "password" ? (
              <EyeOffIcon className="w-3.5 text-[#667085]" />
            ) : (
              <EyeIcon className="w-3.5 text-[#667085]" />
            )}
          </button>
        ) : (
          <span
            className="p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer absolute"
            onClick={() => {
              props.onClick();
            }}
          >
            <CloseCircle className="w-3.5 text-[#667085]" />
          </span>
        )}
      </div>
      {props.errors[props.registerName] && (
        <motion.p
          className="text-xs text-red-500 font-medium"
          {...framer_error}
        >
          {props.errors[props.registerName]?.message}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
