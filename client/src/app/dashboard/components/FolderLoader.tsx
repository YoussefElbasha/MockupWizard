import React from "react";
import FolderPulse from "./FolderPulse";

const FolderLoader = () => {
  const numberOfPulses = 8;
  const pulseElements = Array.from({ length: numberOfPulses }, (_, index) => (
    <div className="py-2" key={index}>
      <FolderPulse />
    </div>
  ));

  return <>{pulseElements}</>;
};

export default FolderLoader;
