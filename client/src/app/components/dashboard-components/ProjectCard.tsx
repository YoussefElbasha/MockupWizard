"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  label: string;
  image: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="flex">
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex w-full md:w-[314px] h-[177px] md:h-[200px] hover:cursor-pointer"
      >
        <div className="relative rounded-2xl overflow-hidden">
          <motion.img
            animate={{ scale: isHover ? 1.08 : 1 }}
            transition={{
              duration: 0.5,
            }}
            src={props.image}
            className="w-full h-full object-cover rounded-2xl"
          />
          <motion.div
            className="flex items-center justify-center absolute rounded-b-2xl w-full bottom-0 p-4 bg-black bg-opacity-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="">{props.label}</p>
          </motion.div>
        </div>
      </button>
    </div>
  );
};

export default ProjectCard;
