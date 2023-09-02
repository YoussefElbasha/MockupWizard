import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  onSubmit: (prompt: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const [isVisible, setIsVisible] = useState(false);
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
      <Button
        className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white"
        onClick={toggleTextInput}
      >
        Dalle
      </Button>
      {isVisible && (
        <div className="absolute bg-background rounded-lg shadow-md top-10 right-0 z-10 w-72 p-2">
          <Textarea
            ref={textareaRef}
            placeholder="Enter your prompt..."
            className="w-full h-24 bg-background rounded-none p-2"
            onChange={handleTextareaChange}
          />
          <Button
            className="bg-secondary text-white px-4 py-2 mt-2 w-full rounded-lg"
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
