'use client'

import React, { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Toaster } from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FolderLoader from '../../components/dashboard-components/FolderLoader'
import FolderButton from '../../components/dashboard-components/FolderButton'
import DeleteFolder from '../../components/dashboard-components/DeleteFolder'
import CreateFolder from '../../components/dashboard-components/CreateFolder'
import api from '../../../../util/Axios'
import FolderTab from '../../components/dashboard-components/FolderTab'
import Home from '@/app/icons/home.svg'
import { handleApiError } from '../../../../util/errorHandling'

const createFolderSchema = yup.object().shape({
  folderName: yup.string().required('Folder name is required').max(20),
})

const deleteFolderSchema = yup.object().shape({
  deleteFolder: yup
    .string()
    .required("You must type 'delete'")
    .oneOf(['delete'], "You must type 'delete'"),
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [folders, setFolders] = useState<any[]>([])
  const [currentFolder, setCurrentFolder] = useState(pathname.split('/')[2])

  const createFolderForm = useForm({
    resolver: yupResolver(createFolderSchema),
  })
  const deleteFolderForm = useForm({
    resolver: yupResolver(deleteFolderSchema),
  })

  const getFolders = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/`
      )
      return response.data
    } catch (error: any) {
      if (error.response.data && error.response.data === 'Login first.') {
        router.push('/sign-in')
      }
      handleApiError(error)
    }
  }
  const createFolder = async ({ folderName }: any) => {
    try {
      await api
        .post(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/create-folder`, {
          folderName: folderName,
        })
        .then((response) => {
          setFolders((prevFolders) => [...prevFolders, response.data])
        })
      mutate('getFolders')
    } catch (error: any) {
      handleApiError(error)
    }
  }
  const handleFolderContent = (folderId: string, folderName: string) => {
    setCurrentFolder(folderName)
    router.push(`/dashboard/${folderName}?id=${folderId}`)
  }
  const getAllProjects = async () => {
    try {
      const projects = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-all-projects`
      )

      console.log(projects.data)
    } catch (e) {
      console.log(e)
    }
    // router.push("/dashboard/all-projects");
  }
  const { data, isLoading } = useSWR('getFolders', getFolders)

  useEffect(() => {
    if (data) {
      setFolders(data)
    }
    const newFolder = pathname.split('/')[2]
    setCurrentFolder(newFolder)
  }, [data, pathname])

  const deleteFolder = async (folderId: string) => {
    try {
      setFolders((prevFolders) => {
        return prevFolders.filter((folder: any) => folder.id !== folderId)
      })
      router.push('/dashboard')
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/delete-folder/${folderId}`
      )
    } catch (e: any) {
      console.log(e)
    }
  }
  return (
    <div className="flex gap-16 p-4 sm:p-10 md:px-40 md:py-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <CreateFolder
            register={createFolderForm.register}
            errors={createFolderForm.formState.errors}
            onClick={createFolderForm.handleSubmit(createFolder)}
          />
          <button
            onClick={() => router.push('/dashboard')}
            className="hover:bg-highlight border border-highlight p-3.5 rounded-lg cursor-pointer">
            <div className="flex gap-[10px] items-center">
              <Home />
              <p className="w-20 text-xs text-left">All Folders</p>
            </div>
          </button>
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
                      name={folder.name}
                      onClick={() =>
                        handleFolderContent(folder.id, folder.name)
                      }
                      isCurrent={currentFolder === folder.name ? true : false}
                    />
                    <DeleteFolder
                      onClick={deleteFolderForm.handleSubmit(() =>
                        deleteFolder(folder.id)
                      )}
                      errors={deleteFolderForm.formState.errors}
                      register={deleteFolderForm.register}
                    />
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-sm text-center">No folders yet.</p>
          )}
        </div>
      </div>
      {pathname === '/dashboard' && !isLoading ? (
        <div className="">
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-4 md:gap-20">
            {folders.map((folder: any) => {
              return (
                <FolderButton
                  key={folder.id}
                  name={folder.name}
                  onClick={() => handleFolderContent(folder.id, folder.name)}
                />
              )
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
    </div>
  )
}

export default Layout
