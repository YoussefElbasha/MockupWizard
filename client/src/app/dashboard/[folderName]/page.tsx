"use client";

import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import api from "../../../../util/Axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ProjectCard from "@/app/components/dashboard-components/ProjectCard";
import { BeatLoader } from "react-spinners";
import AddProject from "@/app/components/dashboard-components/AddProject";
import BackIcon from "@/app/icons/arrow-back-outline.svg";
import { useRouter, useSearchParams } from "next/navigation";
import CreateProject from "@/app/components/dashboard-components/CreateProject";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleApiError } from "../../../../util/errorHandling";
import CreateProject2 from "@/app/components/dashboard-components/CreateProject2";

interface pageProps {
  params: {
    folderName: string;
  };
}

const createProjectSchema = yup.object().shape({
  projectName: yup.string().required("Project name is required").max(20),
});

const Page = (props: pageProps) => {
  const folderId = String(useSearchParams().get("id"));
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const createProjectForm = useForm({
    resolver: yupResolver(createProjectSchema),
  });

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
    try{
      setContent((prevContent) => {
        return prevContent.filter((project: any) => project.id !== projectId);
      });
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/delete-project/${projectId}`
      );
    }catch(error){
      handleApiError(error)
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
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="hover:bg-highlight p-2 rounded-lg"
          >
            <p className="sr-only">Back button</p>
            <BackIcon className="w-8 " />
          </button>
          <p className="text-lg">
            {decodeURIComponent(props.params.folderName)}
          </p>
        </div>

        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <BeatLoader color="white" />
          </div>
        ) : content.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                    image={project.thumbnail}
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
                      onClick={() => {}}
                      initial={{ opacity: 0, x: -10, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                    >
                      <CreateProject2 onSubmit={createProject} />
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
                <h1 className="text-lg md:text-xl lg:text-3xl text-center font-semibold tracking-wide">
                  Create your first project.
                </h1>
                <CreateProject2 onSubmit={createProject} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default Page;
