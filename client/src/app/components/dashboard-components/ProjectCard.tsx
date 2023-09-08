"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import OptionsIcon from "@/app/icons/ellipsis-horizontal-outline.svg";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  id: string;
  label: string;
  image: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    router.push(`/editor/${props.id}`);
  };

  return (
    <div className="flex h-full">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex w-full hover:cursor-pointer rounded-2xl"
      >
        <div className="relative h-full w-full rounded-2xl overflow-hidden">
          <motion.div
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
            <div className="absolute hover:opacity-50 right-[10px] top-1/2 transform -translate-y-1/2">
              <OptionsIcon className="w-8" />
            </div>
          </motion.div>
        </div>
      </button>
    </div>
  );
};

export default ProjectCard;
