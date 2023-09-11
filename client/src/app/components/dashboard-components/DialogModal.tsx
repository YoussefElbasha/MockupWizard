"use client"
import React, {useState} from "react";
import * as Form from "@radix-ui/react-form";

interface dialogModalProps {
  onSubmit: any;
  title: string;
  name: string;
  label: string;
  palceHolder: string;
}

const DialogModal = ({
  onSubmit,
  title,
  name,
  label,
  palceHolder,
}: dialogModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(name === "delete"){
      onSubmit();
    }else{
      const data = new FormData(event.currentTarget);
      setIsLoading(true);
      await onSubmit(data.get(name));
      setIsLoading(false);
    }
    
  };

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Form.Field name={name}>
        <div className="flex flex-col items-baseline justify-between">
          <div className="w-full mb-2">
            <h1 className="text-center text-xl">{title}</h1>
          </div>
          <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
            {label}
          </Form.Label>
          <Form.Message
            className="text-[13px] text-white opacity-[0.8]"
            match="valueMissing"
          >
            This field is required
          </Form.Message>
          {name === "delete" && (
            <Form.Message
              className="text-[13px] text-white opacity-[0.8]"
              match={(value: any) => value.trim() !== "delete"}
            >
              Please type 'delete'
            </Form.Message>
          )}
        </div>
        <Form.Control asChild>
          <input
            className="w-full font-normal text-sm focus:outline-none rounded-md shadow-sm px-3 py-2 text-gray-600 border"
            placeholder={palceHolder}
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <div className="flex mt-6 justify-end space-x-2">
          <button
            type="submit"
            className="text-sm p-2 justify-end rounded-md bg-secondary hover:bg-background border border-secondary transition duration-300 ease-in-out"
          >
            {isLoading? "Loading" : name === "delete" ? "Delete" : "Create"}
          </button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
};

export default DialogModal;
