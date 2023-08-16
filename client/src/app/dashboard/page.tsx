import React from "react";
import Add from "@/app/icons/add.svg";
import Home from "@/app/icons/home.svg";

const page = () => {
  return (
    <div className="bg-[#14162E] min-h-screen text-white">
      <div className="flex gap-10">
        <div className="flex flex-col gap-10">
          <div className="bg-[#4461F21A] pl-[7px] py-[5px] pr-[20px] rounded-full">
            <div className="flex gap-[10px] items-center">
              <div className="w-10 h-10 rounded-full bg-[#DDA82A] flex items-center justify-center">
                <Add />
              </div>
              <p className="text-sm">New folder</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-[#4461F21A] pl-4 py-3.5 pr-[20px] rounded-full">
              <div className="flex gap-[10px] items-center">
                <Home />
                <p className="text-sm">Home</p>
              </div>
            </div>
            <div className="bg-[#4461F21A] pl-[7px] py-[5px] pr-[20px] rounded-full">
              <div className="flex gap-[10px] items-center">
                <div className="w-10 h-10 rounded-full bg-[#DDA82A] flex items-center justify-center">
                  <Add />
                </div>
                <p className="text-sm">New folder</p>
              </div>
            </div>
          </div>
        </div>
        <h1>alooo</h1>
      </div>
    </div>
  );
};

export default page;
