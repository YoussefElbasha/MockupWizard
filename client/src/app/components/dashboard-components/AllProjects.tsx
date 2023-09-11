import React from "react";
import Home from "@/app/icons/home.svg";

const AllProjects = (getP: any) => {
  return (
    <button
      onClick={getP}
      className="hover:bg-highlight border border-highlight p-3.5 rounded-lg cursor-pointer"
    >
      <div className="flex gap-[10px] items-center">
        <Home />
        <p className="w-20 text-xs text-left">All Projects</p>
      </div>
    </button>
  );
};

export default AllProjects;
