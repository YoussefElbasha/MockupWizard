// components/Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white"
      onClick={onClick}
    ></button>
  );
};

export default Button;
