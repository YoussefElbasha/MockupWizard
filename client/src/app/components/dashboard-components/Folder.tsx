import React from "react";
// import FolderIcon from "@/app/icons/folder.svg";
import FolderIcon from "@/app/icons/folder-outline.svg";
import FolderOpenIcon from "@/app/icons/folder-open.svg";
import { motion } from "framer-motion";

interface folderProps {
  id: string;
  name: string;
  onClick: any;
  isCurrent: boolean;
}

const currentStyle = "bg-[#4461F21A] p-4 rounded-full text-[#DDA82A]";

const Folder = (props: folderProps) => {
  return (
    <motion.div
      whileTap={{ scale: props.isCurrent ? 1 : 0.95 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={() => {
          props.onClick(props.id);
        }}
        disabled={props.isCurrent}
        className={`${
          props.isCurrent
            ? currentStyle
            : "hover:bg-[#4461F21A] p-4 rounded-full"
        }`}
      >
        <div className="flex gap-[10px] items-center">
          {props.isCurrent ? (
            <FolderOpenIcon className="w-6" />
          ) : (
            <FolderIcon className="w-6" />
          )}
          <p className="text-xs w-20 text-left">{props.name}</p>
        </div>
      </button>
    </motion.div>
  );
};

export default Folder;
