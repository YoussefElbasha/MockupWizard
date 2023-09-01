import React, { useState } from "react";
import Add from "@/app/icons/add.svg";

const AddProject = () => {
  return (
    <div className="flex h-full">
      <button className="flex justify-center hover:opacity-50 items-center bg-highlight rounded-2xl w-full">
        <div className="flex flex-col items-center gap-3 ">
          <Add />
          <p>New Project</p>
        </div>
      </button>
    </div>
  );
};

export default AddProject;
