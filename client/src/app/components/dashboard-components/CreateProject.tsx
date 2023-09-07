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
        <Modal
          title="Create Project"
          label="Name"
          placeholder="Enter project name"
          button="Create"
          register={props.register}
          errors={props.errors}
          onSubmit={handleSubmit}
          registerName="projectName"
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateProject;
