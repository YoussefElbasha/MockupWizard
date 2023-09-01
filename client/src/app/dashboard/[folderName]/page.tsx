"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import api from "../../../../util/Axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ProjectCard from "@/app/components/dashboard-components/ProjectCard";
import { BeatLoader } from "react-spinners";
import AddProject from "@/app/components/dashboard-components/AddProject";
import BackIcon from "@/app/icons/arrow-back-outline.svg";
import { useRouter } from "next/navigation";

interface pageProps {
  params: {
    folderName: string;
  };
}

const page = (props: pageProps) => {
  const router = useRouter();
  const [content, setContent] = useState([]);

  const getFolderContent = async (folderId: string) => {
    try {
      const response = await api.get(
        `http://api.app.localhost:4000/dashboard/get-folder-contents/${folderId}`
      );
      console.log(response.data);
      return response.data;
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
  const { data, error, isLoading } = useSWR(props.params.folderName, () =>
    getFolderContent(props.params.folderName)
  );
  useEffect(() => {
    if (data) {
      setContent(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div>
        <button
          onClick={() => router.push("/dashboard")}
          className="hover:bg-[#4461F21A] p-2 rounded-lg"
        >
          <BackIcon className="w-8 " />
        </button>
      </div>

      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <BeatLoader color="white" />
        </div>
      ) : content.length !== 0 && !isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {content.map((c: any, idx: number) => (
            <>
              <motion.div
                onClick={() => {}}
                initial={{ opacity: 0, x: -10, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <ProjectCard key={c.id} label={c.name} image={c.thumbnail} />
              </motion.div>
              {idx === content.length - 1 && (
                <motion.div
                  onClick={() => {}}
                  initial={{ opacity: 0, x: -10, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <AddProject />
                </motion.div>
              )}
            </>
          ))}
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl text-center font-semibold tracking-wide">
              Create your first project.
            </h1>
            <AddProject />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
