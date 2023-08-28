"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Add from "@/app/icons/add.svg";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";
import { framer_error } from "@/app/dashboard/motion";

interface createFolderProps {
  onClick: any;
  errors: any;
  register: any;
}

const CreateFolder = (props: createFolderProps) => {
  return (
    <AnimatePresence mode="wait">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div className="bg-[#4461F21A] p-2 rounded-full cursor-pointer">
            <div className="flex gap-[10px] items-center">
              <div className="w-8 h-8 rounded-full bg-[#DDA82A] flex items-center justify-center">
                <Add />
              </div>
              <p className="text-xs w-20 text-left">New Folder</p>
            </div>
          </div>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Backdrop>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0 }}
            >
              <Dialog.Content className="bg-white text-black rounded-md shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90vw max-w-[450px] max-h-[85vh] p-6 animate-contentShow focus:outline-none">
                <form onSubmit={props.onClick}>
                  <Dialog.Title className="text-lg ">
                    Create Folder
                  </Dialog.Title>
                  <fieldset className="flex flex-col gap-3 mt-5">
                    <label className="text-sm">Name</label>
                    <input
                      {...props.register("folderName")}
                      className="w-full rounded-md shadow-sm px-3 py-2 text-violet-11 border focus:ring-violet-7 focus:border-violet-8"
                      placeholder="Enter folder name"
                    />
                    {props.errors.folderName && (
                      <p {...framer_error} className="text-red-400">
                        {props.errors.folderName.message}
                      </p>
                    )}
                  </fieldset>
                  <div className="flex mt-6 justify-end space-x-2">
                    <button type="submit" className="">
                      Create
                    </button>
                  </div>
                </form>
              </Dialog.Content>
            </motion.div>
          </Backdrop>
        </Dialog.Portal>
      </Dialog.Root>
    </AnimatePresence>
  );
};

export default CreateFolder;
