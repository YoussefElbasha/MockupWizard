import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Dashboard from "@/app/icons/dashboard.svg";
import api from "../../../../util/Axios";
import useSWR from "swr";

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
      <div className="container mx-auto flex flex-wrap justify-between py-5 px-14 flex-col md:flex-row items-center">
        <a href="/">
          <p className="text-white text-[28px] font-[600]">
            Mockup<span className="text-[#4461F2]">Wizard</span>
          </p>
        </a>
        <div className="flex gap-8 flex-wrap items-center text-base justify-center">
          <a
            href="/dashboard"
            className={`flex gap-2 items-center ${
              currentTab === "/dashboard" ? currentTabStyle : ""
            }`}
          >
            <Dashboard />
            Dashboard
          </a>
          <a
            className={`${currentTab === "/" ? currentTabStyle : ""}`}
            href="/"
          >
            Home
          </a>
          <a>Account</a>
        </div>
        {userInfo ? (
          <ProfileMenu email={userInfo.email} username={userInfo.username} />
        ) : (
          <p>register</p>
        )}
      </div>
    )
  );
};

export default Navbar;
