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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        Submit
      </Button>
      {isVisible && (
        <div className="absolute bg-white rounded-lg shadow-md top-10 right-0 z-10 w-64">
          <Textarea
            placeholder="Enter your prompt..."
            className="border border-gray-300 w-full h-32 p-4 bg-primary "
          />
          <Button
            className="bg-primary text-white px-4 py-2 mt-2"
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
