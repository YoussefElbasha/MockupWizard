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
import { useRouter } from "next/navigation";
import CreateProject from "@/app/components/dashboard-components/CreateProject";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface pageProps {
  params: {
    folderName: string;
  };
}

const createProjectSchema = yup.object().shape({
  projectName: yup.string().required("Project name is required").max(20),
});

const page = (props: pageProps) => {
  const router = useRouter();
  const [content, setContent] = useState([]);

  const createProjectForm = useForm({
    resolver: yupResolver(createProjectSchema),
  });

  const getFolderContent = async (folderName: string) => {
    try {
      const response = await api.get(
        `http://api.app.localhost:4000/dashboard/get-folder-contents/${folderName}`
      );
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

  const createProject = async ({ projectName }: any) => {
    try {
      await api.post("http://api.app.localhost:4000/dashboard/create-project", {
        folderName: props.params.folderName,
        name: projectName,
      });
      mutate(props.params.folderName);
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

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="hover:bg-[#4461F21A] p-2 rounded-lg"
        >
          <BackIcon className="w-8 " />
        </button>
        <p className="text-lg">{props.params.folderName}</p>
      </div>

      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <BeatLoader color="white" />
        </div>
      ) : content.length !== 0 ? (
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
                  <CreateProject
                    register={createProjectForm.register}
                    errors={createProjectForm.formState.errors}
                    onSubmit={createProjectForm.handleSubmit(createProject)}
                  />
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
            <CreateProject
              register={createProjectForm.register}
              errors={createProjectForm.formState.errors}
              onSubmit={createProjectForm.handleSubmit(createProject)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
