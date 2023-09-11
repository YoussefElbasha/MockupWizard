"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Trash from "@/app/icons/trash-outline.svg";
import DialogModal from "./DialogModal";

interface deleteFolderProps {
  onSubmit: any;
}

const DeleteFolder = ({ onSubmit }: deleteFolderProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-full hover:text-red-600 text-gray-500 p-2.5">
          <Trash className="w-4" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black backdrop-blur-md bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] focus:outline-none">
          <DialogModal
            title="Delete Folder"
            onSubmit={onSubmit}
            name="delete"
            label="Type 'delete' to remove folder"
            palceHolder="delete"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteFolder;
