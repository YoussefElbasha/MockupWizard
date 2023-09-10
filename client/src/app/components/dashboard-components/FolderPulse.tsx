import React from "react";
// import FolderIcon from "@/app/icons/folder.svg";
import FolderIcon from "@/app/icons/folder-outline.svg";
import FolderOpenIcon from "@/app/icons/folder-open.svg";
import { motion } from "framer-motion";

interface folderPulseProps {
  text?: string;
}

const FolderPulse = ({ text }: folderPulseProps) => {
  return (
    <div className="px-4 py-3 bg-highlight rounded-full animate-pulse">
      <div className="flex p-2 gap-[10px] items-center">
        <p className="text-xs text-secondary text-left">{text}</p>
      </div>
    </div>
  );
};

export default FolderPulse;
