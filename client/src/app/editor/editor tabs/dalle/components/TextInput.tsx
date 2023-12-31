import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../components/Hover";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Planet } from "react-ionicons";
import WizardIcon from "../../../../icons/wizard.svg";

interface TextInputProps {
  onSubmit: (prompt: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(prompt);
    setIsVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  const toggleTextInput = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <TooltipProvider delayDuration={300}>
        <Tooltip
          open={isOpen}
          onOpenChange={(open: boolean) => {
            if (isVisible) setIsOpen(false);
            else setIsOpen(open);
          }}
        >
          <TooltipTrigger asChild>
            <div>
              <button
                className="bg-gray-400 p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg "
                disabled
                onClick={toggleTextInput}
              >
                <p className="sr-only">Open text input</p>
                <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300">
                  <Planet
                    style={{ fill: "black", height: "2em", width: "2em" }}
                  />
                </div>
              </button>
            </div>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-45}
            alignOffset={75}
            align="start"
            avoidCollisions={false}
          >
            <p>Generate Image from Text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isVisible && (
        <div className="absolute z-10 p-2 translate-x-4 -translate-y-1/2 rounded-lg shadow-md bg-background left-full top-1/2 w-72">
          <Textarea
            ref={textareaRef}
            placeholder="Enter your prompt..."
            className="w-full h-24 p-2 rounded-none bg-background"
            onChange={handleTextareaChange}
          />
          <Button
            className="w-full px-4 py-2 mt-2 text-white rounded-lg bg-secondary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default TextInput;
