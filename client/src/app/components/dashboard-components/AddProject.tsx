import React, { useState } from "react";
import Add from "@/app/icons/add.svg";
import { motion } from "framer-motion";

const AddProject = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex h-full">
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex justify-center items-center mx-20 py-14 bg-[#4461F21A] rounded-2xl w-full"
      >
        <div
          className={`flex flex-col items-center gap-3 ${
            isHover ? "opacity-100" : "opacity-50"
          }`}
        >
          <Add />
          <p>New Project</p>
        </div>
      </button>
    </div>
  );
};

export default AddProject;
