"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteProject from "./DeleteProject";

interface ProjectCardProps {
  id: string;
  label: string;
  image: string;
  onSubmit: any;
}

const ProjectCard = (props: ProjectCardProps) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    console.log("momen");
    router.push(`/editor/${props.id}`);
  };

  return (
    <div className="flex h-full">
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex w-full hover:cursor-pointer rounded-2xl"
      >
        <div className="relative h-full w-full rounded-2xl overflow-hidden">
          <motion.div
            onClick={handleClick}
            animate={{ scale: isHover ? 1.08 : 1 }}
            transition={{
              duration: 0.5,
            }}
            className="min-h-[10rem] h-full"
          >
            <Image
              src={props.image}
              alt={props.label}
              layout="fill"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="flex items-center justify-center absolute rounded-b-2xl w-full bottom-0 p-4 bg-black bg-opacity-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="">{props.label}</p>
            <DeleteProject onSubmit={props.onSubmit} />
          </motion.div>
        </div>
      </button>
    </div>
  );
};

export default ProjectCard;