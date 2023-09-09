import React from "react";
import FolderIcon from "@/app/icons/folder.svg";
import { motion } from "framer-motion";

interface folderrProps {
  name: string;
  onClick: any;
}

const FolderButton = (props: folderrProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      onClick={props.onClick}
      className="flex flex-col items-center gap-2 cursor-pointer"
    >
      <FolderIcon className="w-20 lg:w-24 fill-current text-secondary" />
      <p>{props.name}</p>
    </motion.button>
  );
};

export default FolderButton;
