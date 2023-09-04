import React from "react";

interface FeatureItemProps {
  imgUrl: string;
  title: string;
  paragraph: string;
  reverse?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  imgUrl,
  title,
  paragraph,
  reverse = false,
}) => {
  return (
    <div
      className={`flex w-full ${
        reverse ? "flex-row-reverse" : ""
      } max-w-[70rem] h-[40rem] items-center justify-between gap-4`}
    >
      <div className="flex flex-col gap-6 py-10 px-2">
        <div className="flex">
          <div className="flex flex-col w-full">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="border-t border-solid border-gray-400 w-full"></div>
          </div>
        </div>
        <div className="flex ">
          <div className="flex flex-col w-full">
            <p className="text-sm">{paragraph}</p>
          </div>
        </div>
      </div>
      <div className="flex items-start bg-white p-4 rounded-lg text-black h-full w-[25em]">
        Screenshot Here
      </div>
      {/* <div className="flex-1">
        <img src={imgUrl} alt={title} className="max-w-full h-auto" />
      </div> */}
    </div>
  );
};

export default FeatureItem;
