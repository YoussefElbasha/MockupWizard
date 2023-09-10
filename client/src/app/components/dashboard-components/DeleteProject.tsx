"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "./Modal";
import OptionsIcon from "@/app/icons/ellipsis-horizontal-outline.svg";
import DialogModal from "./DialogModal";

interface deleteProjectProps {
  onSubmit: any;
}

const DeleteProject = ({ onSubmit }: deleteProjectProps) => {
  const [isOpen, setIsOpen] = useState(false); // Track whether the dialog is open

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="absolute hover:opacity-50 right-[10px] top-1/2 transform -translate-y-1/2">
          <OptionsIcon className="w-8" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black backdrop-blur-md bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] focus:outline-none">
          <DialogModal
            onSubmit={onSubmit}
            name="delete"
            label="Type 'delete' to remove project"
            palceHolder="delete"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteProject;
