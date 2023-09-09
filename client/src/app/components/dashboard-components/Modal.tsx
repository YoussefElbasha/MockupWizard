import React from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";

interface modalProps {
  title: string;
  label: string;
  button: string;
  register: any;
  registerName: string;
  errors: any;
  onSubmit: any;
  placeholder: string;
}

const Modal = (props: modalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Dialog.Content className="data-[state=open]:animate-contentShow text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <form onSubmit={props.onSubmit}>
          <Dialog.Title className="text-xl text-center">
            {props.title}
          </Dialog.Title>
          <fieldset className="flex flex-col gap-3 mt-5">
            <label className="text-sm">{props.label}</label>
            <input
              {...props.register(props.registerName)}
              className="w-full font-normal text-sm focus:outline-none rounded-md shadow-sm px-3 py-2 text-gray-600 border"
              placeholder={props.placeholder}
            />
            {props.errors[props.registerName] && (
              <p className="text-red-400">
                {props.errors[props.registerName].message}
              </p>
            )}
          </fieldset>
          <div className="flex mt-6 justify-end space-x-2">
            <button
              type="submit"
              className="text-sm p-2 rounded-md bg-secondary hover:bg-background border border-secondary transition duration-300 ease-in-out"
            >
              {props.button}
            </button>
          </div>
        </form>
      </Dialog.Content>
    </motion.div>
  );
};

export default Modal;
