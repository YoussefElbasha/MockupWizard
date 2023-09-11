"use client";

import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

import BackIcon from "@/app/icons/arrow-back-outline.svg";
import ProjectCard from "@/app/components/dashboard-components/ProjectCard";
import api from "../../../../../util/Axios";
import { handleApiError } from "../../../../../util/errorHandling";
import CreateProject from "@/app/components/dashboard-components/CreateProject";

interface pageProps {
  params: {
    folderName: string;
  };
}

const Page = ({ params }: pageProps) => {
  const folderId = String(useSearchParams().get("id"));
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const getFolderContent = async (folderId: string) => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-folder-contents/${folderId}`
    );
    return response.data;
  };
  const { data, error, isLoading } = useSWR(folderId, () =>
    getFolderContent(folderId)
  );
  useEffect(() => {
    if (data) {
      setContent(data);
    }
  }, [data]);

  const deleteProject = async (projectId: string) => {
    try {
      setContent((prevContent) => {
        return prevContent.filter((project: any) => project.id !== projectId);
      });
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/delete-project/${projectId}`
      );
    } catch (error) {
      handleApiError(error);
    }
  };

  const createProject = async (projectName: string) => {
    try {
      setIsCreatingProject(true);
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/create-project`,
        {
          folderId: folderId,
          name: projectName,
        }
      );
      await mutate(folderId);
      setIsCreatingProject(false);
    } catch (error: any) {
      handleApiError(error);
    }
  };

  if (error) {
    router.replace("/dashboard");
  } else {
    return (
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/dashboard")}
            className="hover:bg-highlight p-2 rounded-lg"
          >
            <p className="sr-only">Back button</p>
            <BackIcon className="w-8 " />
          </button>
          <p className="text-lg">{decodeURIComponent(params.folderName)}</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <BeatLoader color="white" />
          </div>
        ) : content.length !== 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {content.map((project: any, idx: number) => (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -10, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                >
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    label={project.name}
                    image={
                      project.thumbnail
                        ? project.thumbnail?.replace(
                            "https://res.cloudinary.com/",
                            "/image/"
                          )
                        : "https://res.cloudinary.com/dfbid2goy/image/upload/v1693938458/project_screenshots/h62z3gbxkprftc9m6bk3.png".replace(
                            "https://res.cloudinary.com/",
                            "/image/"
                          )
                    }
                    onSubmit={() => {
                      deleteProject(project.id);
                    }}
                  />
                </motion.div>
                {idx === content.length - 1 && (
                  <>
                    {isCreatingProject && (
                      <div className="flex items-center justify-center bg-highlight min-h-[10rem] rounded-2xl animate-pulse">
                        <p className="text-secondary">Creating...</p>
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: -10, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                    >
                      <CreateProject onSubmit={createProject} />
                    </motion.div>
                  </>
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            {isCreatingProject ? (
              <BeatLoader color="white" />
            ) : (
              <div className="flex flex-col gap-6">
                <h1 className="text-lg font-semibold tracking-wide text-center md:text-xl lg:text-3xl">
                  Create your first project.
                </h1>
                <CreateProject onSubmit={createProject} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Page;
