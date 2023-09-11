import React from "react";
import Home from "@/app/icons/home.svg";

interface allFoldersProps {
  onClick: any;
}

const AllFolders = ({ onClick }: allFoldersProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-highlight border border-highlight p-3.5 rounded-lg cursor-pointer"
    >
      <div className="flex gap-[10px] items-center">
        <Home />
        <p className="text-xs w-20 text-left">All Folders</p>
      </div>
    </button>
  );
};

export default AllFolders;
