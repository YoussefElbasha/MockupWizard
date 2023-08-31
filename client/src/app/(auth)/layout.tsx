"use client";

import React from "react";
import Navbar from "../components/navbar-components/Navbar";
import { motion } from "framer-motion";

const layout = ({ children }: any) => {
  return (
    <div className="bg-[#14162E] m-auto min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute w-full top-0">
        <Navbar
          navLinks={[
            { href: "/dashboard", name: "Dashboard" },
            { href: "/", name: "Home" },
            { href: "/account", name: "Account" },
          ]}
        />
      </div>
      {children}
    </div>
  );
};

export default layout;
