// components/ImageCard.tsx
import React from "react";

interface ImageCardProps {
  imageUrl: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, onClick }) => {
  return (
    <div
      className="border border-gray-300 p-2 m-2 cursor-pointer w-48 h-48"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="Generated"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageCard;
