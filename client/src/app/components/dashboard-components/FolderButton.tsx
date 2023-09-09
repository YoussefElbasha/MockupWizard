import React from "react";
import FolderButtonIcon from "@/app/icons/folderButton.svg";
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
      className="flex flex-col items-center gap-4 cursor-pointer"
    >
      <FolderButtonIcon />
      <p>{props.name}</p>
    </motion.button>
  );
};

export default FolderButton;
