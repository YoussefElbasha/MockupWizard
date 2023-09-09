"use client";
import AuthCanvas from "./components/auth-components/AuthCanvas";
import { useState, useEffect } from "react";
import api from "../../util/Axios";
import FeatureList from "./components/homepage-components/FeatureList";
import StarIcon from "./icons/stars.svg";

export default function Home() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Define your axios call function
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("http://api.app.localhost:4000/api/me");
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // fetchUserInfo(); // Call the function to fetch user info
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center gap-4 w-screen overflow-x-hidden">
      <div className="h-[calc(100vh-8rem)] inline-flex p-[32rem 13.5rem 16rem 13.5rem] justify-center items-center flex-col gap-6">
        <div>
          <h1 className="text-white font-inter font-semibold text-5xl tracking-tight leading-12 mt-1 relative text-center whitespace-nowrap">
            Unleash your product's potential!
          </h1>
        </div>
        <div className="homepage p-text-black">
          <p className="flex items-start justify-center relative p-0 px-58 py-18">
            Have a design you want to see materialized you can see them here
          </p>
        </div>
        <button className="bg-custom-gradient rounded-full px-8 py-2 flex items-center">
          <div className="text-white">Get Started</div>
        </button>
      </div>
      {/* <AuthCanvas /> */}
      {/* <div className="absolute w-10 h-10  bg-red-400 left-1/2 top-1/2"></div> */}
      <div className="relative w-[125%] h-[40vh] overflow-hidden">
        <div className="absolute w-full h-[60rem] bg-background rounded-full flex-shrink-0 z-10 top-[75%] border-t border-secondary/10"></div>
        <div className="absolute w-[65rem] h-[30rem] left-1/2 -translate-x-1/2 top-[18%]">
          <StarIcon className="w-full h-full" />
        </div>
        <div className="absolute w-[58%] aspect-[2/1] bg-custom-radial-gradient top-[22%] left-1/2 -translate-x-1/2"></div>
      </div>
      <FeatureList />
      <div className="relative w-[125%] h-[80vh] overflow-hidden">
        <h1 className=" text-white font-inter font-medium text-5xl tracking-tight leading-12 mt-32 relative text-center whitespace-nowrap z-20 bottom-[0]">
          Give it a try
        </h1>
        <div className="absolute w-full h-[60rem] bg-background rounded-full flex-shrink-0 z-10 bottom-[45%] border-b border-primary/10"></div>
        <div className="absolute w-[65rem] h-[30rem] left-1/2 -translate-x-1/2 bottom-[19%]">
          <StarIcon className="w-full h-full" />
        </div>
        <div className="absolute w-[58%] aspect-[2/1] bg-custom-radial-gradient2 left-1/2 -translate-x-1/2 bottom-[17%] "></div>
      </div>
    </div>
  );
}
