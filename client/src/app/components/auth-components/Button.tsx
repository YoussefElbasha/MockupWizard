import React from "react";

interface buttonProps {
  label: string;
  isMutating: boolean;
}

const Button = (props: buttonProps) => {
  return (
    <button
      type="submit"
      disabled={props.isMutating}
      className={
        props.isMutating
          ? "my-6 text-white bg-blue-100 rounded-lg p-3 text-sm shadow-lg shadow-blue-500/50"
          : "my-6 hover:bg-indigo-500 transition ease-in-out duration-600 text-white bg-[#4461F2] rounded-lg p-3 text-sm shadow-lg shadow-blue-500/50"
      }
    >
      {props.label}
    </button>
  );
};

export default Button;
