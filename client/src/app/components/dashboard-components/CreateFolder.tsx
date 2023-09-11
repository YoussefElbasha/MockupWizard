"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Add from "@/app/icons/add.svg";
import FolderIcon from "@/app/icons/folder-outline.svg";
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
          <button className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-50">
            <FolderIcon className="w-20 lg:w-24" />
            <p>New Folder</p>
          </button>
        ) : (
          <div className="p-2 border rounded-lg cursor-pointer hover:bg-highlight border-highlight">
            <div className="flex gap-[10px] items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
                <Add />
              </div>
              <p className="w-20 text-xs text-left">New Folder</p>
            </div>
          </div>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />
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
