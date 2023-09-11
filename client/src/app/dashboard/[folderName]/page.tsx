'use client'

import React, { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import api from '../../../../util/Axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import ProjectCard from '@/app/components/dashboard-components/ProjectCard'
import { BeatLoader } from 'react-spinners'
import AddProject from '@/app/components/dashboard-components/AddProject'
import BackIcon from '@/app/icons/arrow-back-outline.svg'
import { useRouter, useSearchParams } from 'next/navigation'
import CreateProject from '@/app/components/dashboard-components/CreateProject'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface pageProps {
  params: {
    folderName: string
  }
}

const createProjectSchema = yup.object().shape({
  projectName: yup.string().required('Project name is required').max(20),
})

const Page = (props: pageProps) => {
  const folderId = String(useSearchParams().get('id'))
  const router = useRouter()
  const [content, setContent] = useState([])

  const createProjectForm = useForm({
    resolver: yupResolver(createProjectSchema),
  })

  const getFolderContent = async (folderId: string) => {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-folder-contents/${folderId}`
    )
    return response.data
  }
  const { data, error, isLoading, isValidating } = useSWR(folderId, () =>
    getFolderContent(folderId)
  )
  useEffect(() => {
    if (data) {
      setContent(data)
    }
  }, [data])

  const createProject = async ({ projectName }: any) => {
    try {
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/create-project`,
        {
          folderId: folderId,
          name: projectName,
        }
      )
      mutate(props.params.folderName)
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.error(err.response.data)
      } else if (err.code === 'ERR_NETWORK') {
        toast.error('Network error.')
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  if (error) {
    router.replace('/dashboard')
  } else {
    return (
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="hover:bg-[#4461F21A] p-2 rounded-lg">
            <p className="sr-only">Back button</p>
            <BackIcon className="w-8 " />
          </button>
          <p className="text-lg">
            {decodeURIComponent(props.params.folderName)}
          </p>
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
                  onClick={() => {}}
                  initial={{ opacity: 0, x: -10, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}>
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    label={project.name}
                    image={project.thumbnail.replace(
                      'https://res.cloudinary.com/',
                      '/image/'
                    )}
                  />
                </motion.div>
                {idx === content.length - 1 && (
                  <>
                    {isValidating && !isLoading && (
                      <p className="text-white">Loading....</p>
                    )}
                    <motion.div
                      onClick={() => {}}
                      initial={{ opacity: 0, x: -10, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}>
                      <CreateProject
                        register={createProjectForm.register}
                        errors={createProjectForm.formState.errors}
                        onSubmit={createProjectForm.handleSubmit(createProject)}
                      />
                    </motion.div>
                  </>
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            {isValidating ? (
              <BeatLoader color="white" />
            ) : (
              <div className="flex flex-col gap-6">
                <h1 className="text-lg font-semibold tracking-wide text-center md:text-xl lg:text-3xl">
                  Create your first project.
                </h1>
                <CreateProject
                  register={createProjectForm.register}
                  errors={createProjectForm.formState.errors}
                  onSubmit={createProjectForm.handleSubmit(createProject)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Page
