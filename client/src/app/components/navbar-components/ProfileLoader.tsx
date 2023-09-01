import React from "react";

const ProfileLoader = () => {
  return (
    <div className="flex animate-pulse p-2 items-center gap-4">
      <div className="p-4 rounded-full bg-highlight h-10 w-10 " />
      <div className="flex gap-2 flex-col w-40">
        <div className="p-2 rounded-lg bg-highlight" />
        <div className="p-2 rounded-lg bg-highlight" />
      </div>
    </div>
  );
};

export default ProfileLoader;
