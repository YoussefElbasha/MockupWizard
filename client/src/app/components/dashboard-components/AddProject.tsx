import React, { useState } from "react";
import Add from "@/app/icons/add.svg";
import { motion } from "framer-motion";

const AddProject = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex">
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex justify-center items-center bg-[#4461F21A] rounded-2xl w-full md:w-[314px] h-[177px] md:h-[200px]"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isHover ? 1.1 : 1 }}
          transition={{ duration: 0.1 }}
          className="flex flex-col items-center gap-3"
        >
          <Add />
          <p>New Project</p>
        </motion.div>
      </button>
    </div>
  );
};

export default AddProject;
