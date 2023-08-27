import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Dashboard from "@/app/icons/dashboard.svg";
import api from "../../../../util/Axios";
import useSWR from "swr";
import Link from "next/link";

const currentTabStyle =
  "bg-[#5C9DFF1A] py-[7px] px-[16px] rounded-lg text-[#DDA82A]";

type UserInfo = {
  email: string;
  username: string;
};
const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const fetchUserInfo = async () => {
    try {
      const response = await api.get("http://api.app.localhost:4000/api/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const { data, error, isLoading } = useSWR("user-info", fetchUserInfo);
  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  const currentTab = window.location.pathname;
  return (
    !isLoading && (
      <div className="absolute z-50 container top-0 mx-auto flex flex-wrap justify-between py-5 px-14 flex-col md:flex-row items-center">
        <Link href="/">
          <p className="text-white text-[28px] font-[600]">
            Mockup<span className="text-[#4461F2]">Wizard</span>
          </p>
        </Link>
        <div className="flex gap-8 flex-wrap items-center text-base justify-center">
          <Link
            href="/dashboard"
            className={`flex text-white gap-2 items-center ${
              currentTab === "/dashboard" ? currentTabStyle : ""
            }`}
          >
            <Dashboard />
            Dashboard
          </Link>
          <Link
            className={`text-white ${
              currentTab === "/" ? currentTabStyle : ""
            }`}
            href="/"
          >
            Home
          </Link>
          <a className="text-white">Account</a>
        </div>
        {userInfo ? (
          <ProfileMenu email={userInfo.email} username={userInfo.username} />
        ) : (
          <div className="flex gap-6 items-center">
            <a href="/sign-in" className="text-[#4461F2] text-sm font-[700]">
              Sign in
            </a>
            <a
              href="/signup"
              className="bg-white rounded-xl text-[#4461F2] py-2 px-3 text-sm font-[700]"
            >
              Sign up
            </a>
          </div>
        )}
      </div>
    )
  );
};

export default Navbar;
