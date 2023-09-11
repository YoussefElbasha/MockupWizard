"use client";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { Toaster } from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import FolderLoader from "../../components/dashboard-components/FolderLoader";
import FolderButton from "../../components/dashboard-components/FolderButton";
import DeleteFolder from "../../components/dashboard-components/DeleteFolder";
import CreateFolder from "../../components/dashboard-components/CreateFolder";
import api from "../../../../util/Axios";
import FolderTab from "../../components/dashboard-components/FolderTab";
import Home from "@/app/icons/home.svg";
import { handleApiError } from "../../../../util/errorHandling";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { Toaster } from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import FolderPulse from "./components/FolderPulse";
import AllProjects from "./components/AllProjects";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentFolderId = String(useSearchParams().get("id"));
  const [folders, setFolders] = useState<any[]>([]);
  const [currentFolder, setCurrentFolder] = useState(pathname.split("/")[2]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const getFolders = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/`
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data && error.response.data === "Login first.") {
        router.push("/sign-in");
      }
      handleApiError(error);
    }
  };
  const createFolder = async ({ folderName }: any) => {
    try {
      setIsCreatingFolder(true);
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/create-folder`,
        {
          folderName: folderName,
        }
      );
      await mutate("getFolders");
      setIsCreatingFolder(false);
    } catch (error: any) {
      handleApiError(error);
    }
  };
  const handleFolderContent = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId);
    router.push(`/dashboard/${folderName}?id=${folderId}`);
  };

  const { data, isLoading } = useSWR("getFolders", getFolders);

  useEffect(() => {
    if (data) {
      setFolders(data);
    }
    setCurrentFolder(currentFolderId);
  }, [data, pathname]);

  const deleteFolder = async (folderId: string) => {
    try {
      setFolders((prevFolders) => {
        return prevFolders.filter((folder: any) => folder.id !== folderId);
      });
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/delete-folder/${folderId}`
      );
      await mutate("getFolders");
      router.push("/dashboard");
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const handleAllFolders = () => {
    router.replace("/dashboard");
  };
  return (
    <div className="flex gap-16 p-4 sm:p-10 md:px-40 md:py-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <CreateFolder onSubmit={createFolder} />
          <AllProjects onClick={handleAllFolders} />
        </div>

        <div>
          {isLoading ? (
            <FolderLoader />
          ) : folders.length !== 0 ? (
            <>
              {folders.map((folder: any) => {
                return (
                  <div className="py-2" key={folder.id}>
                    <div className="flex items-center gap-2">
                      <FolderTab
                        key={folder.id}
                        name={folder.name}
                        onClick={() =>
                          handleFolderContent(folder.id, folder.name)
                        }
                        isCurrent={currentFolder === folder.id ? true : false}
                      />
                      <DeleteFolder onSubmit={() => deleteFolder(folder.id)} />
                    </div>
                  </div>
                );
              })}
              {isCreatingFolder && <FolderPulse text="Creating..." />}
            </>
          ) : (
            <p className="text-sm text-center">No folders yet.</p>
          )}
        </div>
      </div>
      {pathname === "/dashboard" && !isLoading ? (
        <div className="">
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-4 md:gap-20">
            {folders.map((folder: any) => {
              return (
                <FolderButton
                  key={folder.id}
                  name={folder.name}
                  onClick={() => handleFolderContent(folder.id, folder.name)}
                />
              );
            })}
            <div className="grid-start">
              <CreateFolder onSubmit={createFolder} fromIcon={true} />
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Layout;
