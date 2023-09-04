"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeAnimation } from "./motion";
import api from "../../../util/Axios";
import Navbar from "../components/navbar-components/Navbar";
import FolderTab from "../components/dashboard-components/FolderTab";
import useSWR, { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import CreateFolder from "../components/dashboard-components/CreateFolder";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Trash from "@/app/icons/trash-outline.svg";
import FolderLoader from "../components/dashboard-components/FolderLoader";
import FolderButton from "../components/dashboard-components/FolderButton";
import AllProjects from "../components/dashboard-components/AllProjects";
import DeleteFolder from "../components/dashboard-components/DeleteFolder";

const createFolderSchema = yup.object().shape({
  folderName: yup.string().required("Folder name is required").max(20),
});

const deleteFolderSchema = yup.object().shape({
  deleteFolder: yup
    .string()
    .required("You must type 'delete'")
    .oneOf(["delete"], "You must type 'delete'"),
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [folders, setFolders] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState(pathname.split("/")[2]);

  const folderId = pathname.split("/")[2];

  const createFolderForm = useForm({
    resolver: yupResolver(createFolderSchema),
  });
  const deleteFolderForm = useForm({
    resolver: yupResolver(deleteFolderSchema),
  });

  const getFolders = async () => {
    try {
      const response = await api.get(`${process.env.SERVER_URL}dashboard/`);
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
      await api
        .post(`${process.env.SERVER_URL}dashboard/create-folder`, {
          folderName: folderName,
        })
        .then((response) => {
          setFolders([...folders, response.data]);
        });
      // mutate("getFolders");
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
  const getAllProjects = () => {
    router.push("/dashboard/all-projects");
  };
  const { data, isLoading } = useSWR("getFolders", getFolders);
  useEffect(() => {
    if (data) {
      setFolders(data);
    }
  }, [data]);
  const handleDeleteFolder = async (folderName: string) => {
    try {
      setFolders((prevFolders) => {
        return prevFolders.filter((f: any) => f.name !== folderName);
      });
      await api.delete(
        `${process.env.SERVER_URL}dashboard/delete-folder/${folderName}`
      );
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <>
      <Toaster />
      <AnimatePresence mode="wait">
        <motion.div
          key="customizer"
          // {...fadeAnimation}
          className="flex gap-16 p-4 sm:p-10 md:px-40 md:py-14"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <CreateFolder
                register={createFolderForm.register}
                errors={createFolderForm.formState.errors}
                onClick={createFolderForm.handleSubmit(createFolder)}
              />
              <AllProjects />
            </div>

            <div>
              {isLoading ? (
                <FolderLoader />
              ) : folders.length !== 0 ? (
                folders.map((folder: any) => {
                  return (
                    <div className="py-2" key={folder.id}>
                      <div className="flex items-center gap-2">
                        <FolderTab
                          key={folder.id}
                          id={folder.id}
                          name={folder.name}
                          onClick={handleFolderContent}
                          isCurrent={
                            currentFolder === folder.name ? true : false
                          }
                        />
                        <DeleteFolder
                          onClick={deleteFolderForm.handleSubmit(() =>
                            handleDeleteFolder(folder.name)
                          )}
                          errors={deleteFolderForm.formState.errors}
                          register={deleteFolderForm.register}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-center">No folders yet.</p>
              )}
            </div>
          </div>
          {pathname === "/dashboard" && !isLoading ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {folders.map((folder: any) => {
                  return (
                    <FolderButton
                      key={folder.id}
                      id={folder.id}
                      name={folder.name}
                      onClick={handleFolderContent}
                    />
                  );
                })}
                <div className="grid-start">
                  <CreateFolder
                    register={createFolderForm.register}
                    errors={createFolderForm.formState.errors}
                    onClick={createFolderForm.handleSubmit(createFolder)}
                    fromIcon={true}
                  />
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Layout;
