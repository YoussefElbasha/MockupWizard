import React from "react";

interface ImageCardProps {
  imageUrl: string;
  onClick: () => void;
  isSelected: boolean; // Add the isSelected prop
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  onClick,
  isSelected,
}) => {
  const cardClassName = isSelected
    ? "border border-secondary p-2 m-2 cursor-pointer w-48 h-48"
    : "border border-gray-300 p-2 m-2 cursor-pointer w-48 h-48";

  return (
    <div className={cardClassName} onClick={onClick}>
      <img
        src={imageUrl}
        alt="Generated"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageCard;
