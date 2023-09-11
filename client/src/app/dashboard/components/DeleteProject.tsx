"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import TrashIcon from "@/app/icons/trash-outline.svg";
import DialogModal from "./DialogModal";

interface deleteProjectProps {
  onSubmit: any;
}

const DeleteProject = ({ onSubmit }: deleteProjectProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="absolute rounded-full hover:text-red-600 text-gray-500 p-2.5 right-[10px] top-1/2 transform -translate-y-1/2">
          <TrashIcon className="w-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black backdrop-blur-md bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] focus:outline-none">
          <DialogModal
            onSubmit={onSubmit}
            title="Delete Project"
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
