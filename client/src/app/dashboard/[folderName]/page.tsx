"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import api from "../../../../util/Axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ProjectCard from "@/app/components/dashboard-components/ProjectCard";

interface pageProps {
  params: {
    folderName: string;
  };
}

const page = (props: pageProps) => {
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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {isLoading
          ? "Loading...."
          : content.length !== 0 &&
            content.map((c: any, idx: number) => (
              <motion.div
                onClick={() => {}}
                key={idx}
                initial={{ opacity: 0, x: -10, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
              >
                <ProjectCard key={c.id} label={c.name} image={c.thumbnail} />
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default page;
