'use client'
import toast from 'react-hot-toast'
import ImageCard from './components/imagecard'
import TextInput from './components/TextInput'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import api from '../../../../util/Axios'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useSWRMutation from 'swr/mutation'

const PAGE_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/generate-image`

const Page = () => {
  const [urls, setUrls] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { trigger, isMutating } = useSWRMutation(
    'http://api.app.localhost:4000/editor/generate-image',
    async (url, { arg }: { arg: string }) => {
      const res = await api.post(url, { prompt: arg })
      return res.data
    },
    {
      onSuccess: (data) => {
        setUrls(data)
      },
      onError: (error) => {
        toast.error('Something went wrong')
        console.error(error)
      },
    }
  )

  // const handleSubmission = async (prompt: string) => {
  //   try {
  //     setIsLoading(true)
  //     setIsDialogOpen(true)
  //     const response = await api.post(PAGE_API_ENDPOINT, { prompt })
  //     const images = response.data
  //     setUrls(images)
  //   } catch (error) {
  //     toast.error('Something went wrong')
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }
  const handleConfirm = () => {
    // Perform actions when the user confirms their choice
    if (selectedImage) {
      console.log('Selected image:', selectedImage)
    } else {
      console.log('No image selected')
    }
    setIsDialogOpen(false) // Close the dialog
  }

  const handleImageClick = (imageUrl: string) => {
    // Update the selected image when the user clicks on an image
    setSelectedImage(imageUrl)
    console.log('Selected image:', selectedImage)
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen m-auto bg-background">
      <motion.div
        initial={{ top: '21%', left: '6%', x: '0%', y: '0%', opacity: 1 }}
        animate={{ top: '20%', left: '36%', x: '0%', y: '0%', opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="rounded-full opacity-50 w-60 h-60 bg-secondary blur-3xl" />
      </motion.div>
      <motion.div
        initial={{ top: '57%', left: '13%', x: '0%', y: '0%', opacity: 1 }}
        animate={{ top: '57%', left: '47%', x: '0%', y: '0%', opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="rounded-full opacity-50 w-60 h-60 bg-primary blur-3xl" />
      </motion.div>
      <TextInput
        onSubmit={
          // handleSubmission

          (prompt) => {
            setIsDialogOpen(true)
            trigger(prompt)
          }
        }
      />
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose an Image</DialogTitle>
            </DialogHeader>
            {isMutating ? (
              // Render loading content while isLoading is true
              <p>Loading...</p>
            ) : (
              // Render image cards when isLoading is false
              <div className="flex flex-row gap-2">
                {urls.map((url: string) => (
                  <ImageCard
                    key={url}
                    imageUrl={url}
                    onClick={() => handleImageClick(url)}
                    isSelected={selectedImage === url} // Add isSelected prop
                  />
                ))}
              </div>
            )}
            <DialogFooter>
              <button
                className="px-4 py-2 text-white rounded-lg bg-secondary"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default Page
