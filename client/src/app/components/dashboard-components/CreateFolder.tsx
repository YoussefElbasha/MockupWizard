"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Add from "@/app/icons/add.svg";
import FolderIcon from "@/app/icons/folder-outline.svg";
import DialogModal from "./DialogModal";

interface createFolderProps {
  onSubmit: any;
  fromIcon?: boolean;
}

const CreateFolder = ({ onSubmit, fromIcon }: createFolderProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {fromIcon ? (
          <button className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-50">
            <FolderIcon className="w-20 lg:w-24" />
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
        <Dialog.Content className="text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] focus:outline-none">
          <DialogModal
            title="Create Folder"
            onSubmit={onSubmit}
            name="create"
            label="Name"
            palceHolder="Enter Folder Name"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateFolder;
