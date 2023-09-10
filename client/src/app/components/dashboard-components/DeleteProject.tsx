"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "./Modal";
import OptionsIcon from "@/app/icons/ellipsis-horizontal-outline.svg";
import * as Form from "@radix-ui/react-form";

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
        <Dialog.Content className="data-[state=open]:animate-contentShow text-white fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Form.Root>
            <Form.Field name="delete">
              <div className="flex flex-col items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                  Type 'delete' to remove project
                </Form.Label>
                <Form.Message
                  className="text-[13px] text-white opacity-[0.8]"
                  match="valueMissing"
                >
                  You must type 'delete'
                </Form.Message>
                <Form.Message
                  className="text-[13px] text-white opacity-[0.8]"
                  match={(value) => value.trim() !== "delete"}
                >
                  Please type 'delete'
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="w-full font-normal text-sm focus:outline-none rounded-md shadow-sm px-3 py-2 text-gray-600 border"
                  placeholder="delete"
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
              <div className="flex mt-6 justify-end space-x-2">
                <button
                  onClick={onSubmit}
                  className="text-sm p-2 justify-end rounded-md bg-secondary hover:bg-background border border-secondary transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </Form.Submit>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteProject;
