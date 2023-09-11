'use client'

import React, { useEffect, useState } from 'react'
import Add from '@/app/icons/add.svg'
import HomeIcon from '@/app/icons/home.svg'
import FolderIcon from '@/app/icons/folder-outline.svg'
import FolderrIcon from '@/app/icons/folderr.svg'
import ProjectCard from '../../components/dashboard-components/ProjectCard'
import { AnimatePresence, motion } from 'framer-motion'
import AddProject from '../../components/dashboard-components/AddProject'
import { fadeAnimation, slideAnimation } from './motion'
import axios from 'axios'
import api from '../../../../util/Axios'
import Navbar from '../../components/navbar-components/Navbar'
import Folder from '../../components/dashboard-components/FolderTab'
import useSWR from 'swr'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import CreateFolder from '../../components/dashboard-components/CreateFolder'

const Page = () => {
  const router = useRouter()
  const [inCustomizer, setInCustomizer] = useState(true)
  const [folders, setFolders] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  const [currentFolderContents, setCurrentFolderContents] = useState([])
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [currentFolder, setCurrentFolder] = useState('')

  const getFolders = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/`
      )
      return response.data
    } catch (err: any) {
      if (
        err.response &&
        err.response.data &&
        err.response.data === 'Login first.'
      ) {
        router.push('/sign-in')
      }
      if (err.response && err.response.data) {
        toast.error(err.response.data)
      } else if (err.code === 'ERR_NETWORK') {
        toast.error('Network error.')
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }
  const createFolder = async (folderName: string) => {
    try {
      await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/create-folder`,
        {
          folderName: folderName,
        }
      )
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
  const getFolderContent = async (folderId: string) => {
    try {
      setCurrentFolder(folderId)
      setIsLoadingContent(true)
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-folder-contents/${folderId}`
      )
      console.log(response.data)
      setCurrentFolderContents(response.data)
      setIsLoadingContent(false)
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
  // const { data, error, isLoading } = useSWR("getFolders", getFolders);
  // useEffect(() => {
  //   if (data) {
  //     setFolders(data);
  //   }
  // }, [data]);
  const handleDeleteFolder = async () => {
    try {
      await api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/delete-folder/cllma7q690000trck231h3f5g`
      )
    } catch (e: any) {
      console.log(e)
    }
  }
  return (
    <></>
    // <div className="relative bg-[#14162E] min-h-screen text-white">
    //   <Toaster />
    //   <AnimatePresence mode="wait">
    //     {inCustomizer && !isLogged && (
    //       <>
    //         <div className="">
    //           <Navbar />
    //         </div>
    //         <motion.div
    //           key="customizer"
    //           {...fadeAnimation}
    //           className="flex gap-16 p-4 sm:p-10 md:p-20"
    //         >
    //           <div className="flex flex-col gap-10">
    //             <CreateFolder onClick={createFolder} />
    //             <div>
    //               {isLoading
    //                 ? "Loading..."
    //                 : folders.map((folder: any) => {
    //                     return (
    //                       <div className="py-2">
    //                         <Folder
    //                           key={folder.id}
    //                           id={folder.id}
    //                           name={folder.name}
    //                           onClick={getFolderContent}
    //                           isCurrent={
    //                             currentFolder === folder.id ? true : false
    //                           }
    //                         />
    //                       </div>
    //                     );
    //                   })}
    //             </div>
    //           </div>
    //           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
    //             {isLoadingContent ? "Loading..." : ""}
    //             {currentFolderContents &&
    //               currentFolderContents.map((content: any, idx) => (
    //                 <motion.div
    //                   onClick={() => setInCustomizer(false)}
    //                   key={idx}
    //                   initial={{ opacity: 0, x: -10, y: 20 }}
    //                   animate={{ opacity: 1, x: 0, y: 0 }}
    //                   transition={{ duration: 0.5, delay: idx + 0.1 }}
    //                 >
    //                   <ProjectCard
    //                     key={content.id}
    //                     label={content.name}
    //                     image={content.thumbnail}
    //                   />
    //                 </motion.div>
    //               ))}
    //             <motion.div
    //               initial={{ opacity: 0, x: -10, y: 20 }}
    //               animate={{ opacity: 1, x: 0, y: 0 }}
    //               transition={{ duration: 0.5, delay: 1.6 }}
    //             >
    //               <AddProject />
    //             </motion.div>
    //           </div>
    //         </motion.div>
    //       </>
    //     )}
    //     {!inCustomizer && (
    //       <motion.div key="home" {...fadeAnimation}>
    //         <Home />
    //       </motion.div>
    //     )}
    //   </AnimatePresence>
    // </div>
  )
}

export default Page
