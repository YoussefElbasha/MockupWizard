"use client";
import Image from "next/image";
import AuthCanvas from "./components/auth-components/AuthCanvas";
import { useState, useEffect } from "react";
import api from "../../util/Axios";
import FeatureList from "./components/homepage-components/FeatureList";
import Link from "next/link";

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
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="inline-flex p-[32rem 13.5rem 16rem 13.5rem] justify-center items-center flex-col gap-6">
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

      <FeatureList />
    </div>
  );
}
