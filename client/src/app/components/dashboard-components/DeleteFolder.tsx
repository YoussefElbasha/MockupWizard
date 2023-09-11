"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "./Modal";
import Trash from "@/app/icons/trash-outline.svg";

interface deleteFolderProps {
  onClick: any;
  errors: any;
  register: any;
}

const DeleteFolder = (props: deleteFolderProps) => {
  const [isOpen, setIsOpen] = useState(false); // Track whether the dialog is open

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onClick();
    if (props.errors.deleteFolder) {
      console.log(props.errors);
    } else {
      console.log("no errors");
      closeDialog();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="rounded-full hover:text-red-600 text-gray-500 p-2.5">
          <Trash className="w-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />
        <Modal
          title="Delete Folder"
          label="Type 'delete' to remove the folder"
          placeholder="delete"
          button="Delete"
          register={props.register}
          errors={props.errors}
          onSubmit={handleFormSubmit}
          registerName="deleteFolder"
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteFolder;
