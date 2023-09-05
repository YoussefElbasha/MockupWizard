import React from "react";
import Balancer from "react-wrap-balancer";

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
      className={`flex w-full max-w-screen-lg ${
        reverse ? "flex-row-reverse" : ""
      } h-[20rem] items-center justify-between gap-52`}
    >
      <div className="flex-1 flex flex-col gap-6 max-w-[30em] justify-start items-start">
        <h2 className="text-2xl font-bold">
          <Balancer>{title}</Balancer>
        </h2>
        <div className="w-full h-[1px] bg-white/10 w-full" />
        <p className="text-white">{paragraph}</p>
      </div>
      <div className="flex-1 aspect-video bg-red-400 flex items-start bg-white rounded-lg text-black justify-center items-center">
        Screenshot Here
      </div>
      {/* <div className="flex-1">
        <img src={imgUrl} alt={title} className="max-w-full h-auto" />
      </div> */}
    </div>
  );
};

export default FeatureItem;
