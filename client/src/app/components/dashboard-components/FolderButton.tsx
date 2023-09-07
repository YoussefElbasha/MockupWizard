import React from "react";
import FolderrIcon from "@/app/icons/folderr.svg";
import { motion } from "framer-motion";

interface folderrProps {
  id: string;
  name: string;
  onClick: any;
}

const FolderButton = (props: folderrProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      onClick={() => props.onClick(props.name)}
      className="flex flex-col items-center gap-4 cursor-pointer"
    >
      <FolderrIcon />
      <p>{props.name}</p>
    </motion.button>
  );
};

export default FolderButton;
