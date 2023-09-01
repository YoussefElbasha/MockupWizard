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
    <Backdrop>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <Dialog.Content className="bg-background font-semibold text-white w-[500px] rounded-md shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 animate-contentShow focus:outline-none">
          <form onSubmit={props.onSubmit}>
            <Dialog.Title className="text-xl">{props.title}</Dialog.Title>
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
                className="text-sm p-2 rounded-md hover:bg-secondary hover:text-white transition duration-300 ease-in-out"
              >
                {props.button}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
