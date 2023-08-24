"use client";

import React, { useState } from "react";
import Add from "@/app/icons/add.svg";
import HomeIcon from "@/app/icons/home.svg";
import ProjectCard from "../components/dashboard-components/ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import AddProject from "../components/dashboard-components/AddProject";
import Home from "../page";
import { fadeAnimation, slideAnimation } from "./motion";
import axios from "axios";
import api from "../../../util/Axios";
import Navbar from "../components/navbar-components/Navbar";
import Folder from "../components/dashboard-components/Folder";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [inCustomizer, setInCustomizer] = useState(true);
  const [folders, setFolders] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const getFolders = async () => {
    try {
      const response = await api.get(
        "http://api.app.localhost:4000/dashboard/"
      );
      console.log(response);
    } catch (err: any) {
      if (
        err.response &&
        err.response.data &&
        err.response.data === "Login first."
      ) {
        router.push("/");
      }
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Network error.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const { data, error, isLoading } = useSWR("/api/user", getFolders);
  const projects = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
  const handleCreateFolder = async () => {
    try {
      await api.post("http://api.app.localhost:4000/dashboard/create-folder", {
        folderName: "sbacefolderr",
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleDeleteFolder = async () => {
    try {
      await api.delete(
        `http://api.app.localhost:4000/dashboard/delete-folder/cllma7q690000trck231h3f5g`
      );
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div className="relative bg-[#14162E] min-h-screen text-white">
      <Toaster />
      <AnimatePresence mode="wait">
        {inCustomizer && !isLogged && (
          <>
            <div className="">
              <Navbar />
            </div>
            <motion.div
              key="customizer"
              {...fadeAnimation}
              className="flex gap-16 p-4 sm:p-10 md:p-20"
            >
              <div className="flex flex-col gap-10">
                <div className="bg-[#4461F21A] p-2 rounded-full">
                  <button
                    onClick={handleCreateFolder}
                    className="flex gap-[10px] items-center"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#DDA82A] flex items-center justify-center">
                      <Add />
                    </div>
                    <p className="text-xs w-20 text-left">New Folder</p>
                  </button>
                </div>
                <div>
                  <Folder />
                  <Folder />
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
          </>
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
