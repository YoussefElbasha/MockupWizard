"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Add from "@/app/icons/add.svg";
import FolderIcon from "@/app/icons/create-folder.svg";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";
import { framer_error } from "@/app/dashboard/motion";
import Modal from "./Modal";
import AddProject from "./AddProject";
import api from "../../../../util/Axios";
import { toast } from "react-hot-toast";

interface createProjectProps {
  register: any;
  errors: any;
  onSubmit: any;
}

const CreateProject = (props: createProjectProps) => {
  const [isOpen, setIsOpen] = useState(false); // Track whether the dialog is open

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(event);
    if (props.errors.projectName) {
      console.log(props.errors);
    } else {
      console.log("no errors");
      closeDialog();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <div className="flex h-full">
          <button className="flex justify-center h-full hover:opacity-50 items-center bg-highlight rounded-2xl w-full">
            <div className="flex flex-col items-center gap-3 ">
              <Add />
              <p>New Project</p>
            </div>
          </button>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black backdrop-blur-md bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[750px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <form onSubmit={handleSubmit}>
            <Dialog.Title className="text-2xl text-center">
              Create Project
            </Dialog.Title>
            <fieldset className="flex flex-col gap-3 mt-5 mb-10">
              <label className="text-sm">Name</label>
              <input
                {...props.register("projectName")}
                className="w-full font-normal text-sm focus:outline-none rounded-md shadow-sm px-3 py-2 text-gray-600 border"
                placeholder="Enter project name"
              />
              {props.errors.projectName && (
                <p className="text-red-400">
                  {props.errors.projectName.message}
                </p>
              )}
            </fieldset>
            <h1 className="text-xl text-center">Choose your model</h1>
            <div className="flex gap-4 items-center justify-center my-8">
              <button className="py-20 px-20 rounded-lg bg-highlight border border-background hover:border-secondary">
                Mug
              </button>
              <button className="py-20 px-20 rounded-lg bg-highlight border border-background hover:border-secondary">
                T-shirt
              </button>
              <button className="py-20 px-20 rounded-lg bg-highlight border border-background hover:border-secondary">
                Shoes
              </button>
            </div>
            <div className="flex mt-6 justify-end space-x-2">
              <button
                type="submit"
                className="text-sm p-2 rounded-md hover:bg-secondary hover:text-white transition duration-300 ease-in-out"
              >
                Create
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateProject;
