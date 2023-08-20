"use client";

import React, { useState } from "react";
import Add from "@/app/icons/add.svg";
import HomeIcon from "@/app/icons/home.svg";
import ProjectCard from "../components/dashboard-components/ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import AddProject from "../components/dashboard-components/AddProject";
import Home from "../page";
import { fadeAnimation, slideAnimation } from "./motion";

const page = () => {
  const [inCustomizer, setInCustomizer] = useState(true);
  const projects = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
  return (
    <div className="bg-[#14162E] min-h-screen text-white">
      <AnimatePresence mode="wait">
        {inCustomizer && (
          <motion.div
            key="customizer"
            {...fadeAnimation}
            className="flex gap-16 p-4 sm:p-10 md:p-20"
          >
            <div className="flex flex-col gap-10">
              <div className="bg-[#4461F21A] pl-[7px] py-[5px] pr-[20px] rounded-full">
                <div className="flex gap-[10px] items-center">
                  <div className="w-10 h-10 rounded-full bg-[#DDA82A] flex items-center justify-center">
                    <Add />
                  </div>
                  <p className="text-sm">New folder</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#4461F21A] pl-4 py-3.5 pr-[20px] rounded-full">
                  <div className="flex gap-[10px] items-center">
                    <HomeIcon />
                    <p className="text-sm">Home</p>
                  </div>
                </div>
                <div className="bg-[#4461F21A] pl-[7px] py-[5px] pr-[20px] rounded-full">
                  <div className="flex gap-[10px] items-center">
                    <div className="w-10 h-10 rounded-full bg-[#DDA82A] flex items-center justify-center">
                      <Add />
                    </div>
                    <p className="text-sm">New folder</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {projects.map((p, idx) => (
                <motion.div
                  onClick={() => setInCustomizer(false)}
                  key={p}
                  initial={{ opacity: 0, x: -10, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: p }}
                >
                  <ProjectCard label="Project 2" image="/tshirt.png" />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <AddProject />
              </motion.div>
            </div>
          </motion.div>
        )}
        {!inCustomizer && (
          <motion.div key="home" {...fadeAnimation}>
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default page;
