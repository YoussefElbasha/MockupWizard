// components/TextInput.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  onSubmit: (prompt: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Track whether the text input is visible

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(event.target.value);
  };
  const handleSubmit = () => {
    onSubmit(prompt);
  };

  const toggleTextInput = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <Button
        className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white"
        onClick={toggleTextInput}
      >
        Dalle
      </Button>
      {isVisible && (
        <div className="absolute bg-background rounded-lg shadow-md top-10 right-0 z-10 w-72 p-2">
          <Textarea
            placeholder="Enter your prompt..."
            className="w-full h-24 bg-background rounded-none  p-2"
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
