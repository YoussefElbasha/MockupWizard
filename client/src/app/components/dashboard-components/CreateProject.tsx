"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Add from "@/app/icons/add.svg";
import DialogModal from "./DialogModal";

interface createProjectProps {
  onSubmit: any;
}

const CreateProject = ({ onSubmit }: createProjectProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="flex h-full">
          <button className="flex justify-center h-48 hover:opacity-50 items-center bg-highlight rounded-2xl w-full">
            <div className="flex flex-col items-center gap-3 ">
              <Add />
              <p className="text-xs md:text-sm">New Project</p>
            </div>
          </button>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black backdrop-blur-md bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] focus:outline-none">
          <DialogModal
            title="Create Project"
            onSubmit={onSubmit}
            name="create"
            label="Name"
            palceHolder="Enter Project Name"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateProject;
