import React from "react";
import Profile from "./Profile";
import Dashboard from "@/app/icons/dashboard.svg";

const currentTabStyle =
  "bg-[#5C9DFF1A] py-[7px] px-[16px] rounded-lg text-[#DDA82A]";

const Navbar = () => {
  const currentTab = window.location.pathname;
  console.log(currentTab);
  return (
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
        <a className={`${currentTab === "/" ? currentTabStyle : ""}`} href="/">
          Home
        </a>
        <a>Account</a>
      </div>
      <Profile />
    </div>
  );
};

export default Navbar;
