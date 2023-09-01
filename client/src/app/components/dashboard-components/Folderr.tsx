import React from "react";
import FolderrIcon from "@/app/icons/folderr.svg";
import { motion } from "framer-motion";

interface folderrProps {
  id: string;
  name: string;
  onClick: any;
}

const Folderr = (props: folderrProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={() => props.onClick(props.id)}
      className="flex flex-col items-center gap-4 cursor-pointer"
    >
      <FolderrIcon className="text-red-400" />
      <p>{props.name}</p>
    </motion.button>
  );
};

export default Folderr;
