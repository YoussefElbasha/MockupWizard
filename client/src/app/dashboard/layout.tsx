"use client";

import React, { useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import CreateFolder from "../components/dashboard-components/CreateFolder";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Trash from "@/app/icons/trash-outline.svg";
import { BeatLoader } from "react-spinners";
import FolderPulse from "../components/dashboard-components/FolderPulse";
import FolderLoader from "../components/dashboard-components/FolderLoader";
import FolderrIcon from "@/app/icons/folderr.svg";
import Folderr from "../components/dashboard-components/Folderr";

const schema = yup.object().shape({
  folderName: yup.string().required("Folder name is required").max(20),
});

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [inCustomizer, setInCustomizer] = useState(true);
  const [folders, setFolders] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [currentFolderContents, setCurrentFolderContents] = useState([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("");

  const pathname = usePathname();
  const folderId = pathname.split("/")[2];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getFolders = async () => {
    try {
      const response = await api.get(
        "http://api.app.localhost:4000/dashboard/"
      );
      return response.data;
    } catch (err: any) {
      if (
        err.response &&
        err.response.data &&
        err.response.data === "Login first."
      ) {
        router.push("/sign-in");
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
  const createFolder = async ({ folderName }: any) => {
    try {
      console.log(folderName);
      await api.post("http://api.app.localhost:4000/dashboard/create-folder", {
        folderName: folderName,
      });
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Network error.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const getFolderContent = async (folderId: string) => {
    try {
      setCurrentFolder(folderId);
      setIsLoadingContent(true);
      const response = await api.get(
        `http://api.app.localhost:4000/dashboard/get-folder-contents/${folderId}`
      );
      setCurrentFolderContents(response.data);
      setIsLoadingContent(false);
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else if (err.code === "ERR_NETWORK") {
        toast.error("Network error.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const handleFolderContent = (folderId: string) => {
    setCurrentFolder(folderId);
    router.push(`/dashboard/${folderId}`);
  };
  const { data, error, isLoading } = useSWR("getFolders", getFolders);
  useEffect(() => {
    if (data) {
      setFolders(data);
    }
  }, [data]);
  const handleDeleteFolder = async (folderId: string) => {
    try {
      setFolders((prevFolders) => {
        return prevFolders.filter((f: any) => f.id !== folderId);
      });
      await api.delete(
        `http://api.app.localhost:4000/dashboard/delete-folder/${folderId}`
      );
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div className="relative bg-[#14162E] min-h-screen text-white">
      <Toaster />
      <AnimatePresence mode="wait">
        <div className="flex flex-col">
          <Navbar
            navLinks={[
              { href: "/dashboard", name: "Dashboard" },
              { href: "/", name: "Home" },
              { href: "/account", name: "Account" },
            ]}
          />
          <motion.div
            key="customizer"
            {...fadeAnimation}
            className="flex gap-16 p-4 sm:p-10 md:px-40 md:py-14"
          >
            <div className="flex flex-col gap-8">
              <CreateFolder
                register={register}
                errors={errors}
                onClick={handleSubmit(createFolder)}
              />
              <div>
                {isLoading ? (
                  <FolderLoader />
                ) : (
                  folders.map((folder: any) => {
                    return (
                      <div className="py-2" key={folder.id}>
                        <div className="flex items-center gap-2">
                          <Folder
                            key={folder.id}
                            id={folder.id}
                            name={folder.name}
                            onClick={handleFolderContent}
                            isCurrent={folderId === folder.id ? true : false}
                          />
                          <button
                            onClick={() => {
                              handleDeleteFolder(folder.id);
                            }}
                            className="rounded-full hover:text-red-600 text-gray-500 p-2.5"
                          >
                            <Trash className="w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {pathname === "/dashboard" && !isLoading ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                  {folders.map((folder: any) => {
                    return (
                      <Folderr
                        key={folder.id}
                        id={folder.id}
                        name={folder.name}
                        onClick={handleFolderContent}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              children
            )}
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
