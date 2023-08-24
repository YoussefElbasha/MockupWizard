import React from "react";
import FolderIcon from "@/app/icons/folder.svg";

const Folder = () => {
  return (
    <div>
      <div className="hover:bg-[#4461F21A] p-4 rounded-full">
        <button onClick={() => {}} className="flex gap-[10px] items-center">
          <FolderIcon />
          <p className="text-xs w-20 text-left">Folder 1</p>
        </button>
      </div>
    </div>
  );
};

export default Folder;
