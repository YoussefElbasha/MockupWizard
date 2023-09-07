"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Add from "@/app/icons/add.svg";
import FolderIcon from "@/app/icons/create-folder.svg";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";
import { framer_error } from "@/app/dashboard/motion";
import Modal from "./Modal";

interface createFolderProps {
  onClick: any;
  errors: any;
  register: any;
  fromIcon?: boolean;
}

const CreateFolder = (props: createFolderProps) => {
  const [isOpen, setIsOpen] = useState(false); // Track whether the dialog is open

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onClick(event);
    if (props.errors.folderName) {
      console.log(props.errors);
    } else {
      console.log("no errors");
      closeDialog();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {props.fromIcon ? (
          <button className="flex flex-col items-center gap-4 cursor-pointer hover:opacity-50">
            <FolderIcon />
            <p>New Folder</p>
          </button>
        ) : (
          <div className="hover:bg-highlight border border-highlight p-2 rounded-lg cursor-pointer">
            <div className="flex gap-[10px] items-center">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Add />
              </div>
              <p className="text-xs w-20 text-left">New Folder</p>
            </div>
          </div>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black backdrop-blur-md bg-opacity-50 fixed inset-0" />
        <Modal
          title="Create Folder"
          label="Folder name"
          placeholder="Enter folder name"
          button="Create"
          register={props.register}
          errors={props.errors}
          onSubmit={handleFormSubmit}
          registerName="folderName"
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateFolder;
