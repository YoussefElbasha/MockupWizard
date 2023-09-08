'use client'
import toast from 'react-hot-toast'
import ImageCard from './components/imagecard'
import TextInput from './components/TextInput'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import api from '../../../util/Axios'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const PAGE_API_ENDPOINT = 'http://api.app.localhost:4000/editor/generate-image'

const Page = () => {
  const [urls, setUrls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleSubmission = async (prompt: string) => {
    try {
      setIsLoading(true)
      setIsDialogOpen(true)
      const response = await api.post(PAGE_API_ENDPOINT, { prompt })
      const images = response.data
      setUrls(images)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
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
    <div className="bg-background m-auto min-h-screen flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ top: '21%', left: '6%', x: '0%', y: '0%', opacity: 1 }}
        animate={{ top: '20%', left: '36%', x: '0%', y: '0%', opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="w-60 h-60 bg-secondary rounded-full blur-3xl opacity-50" />
      </motion.div>
      <motion.div
        initial={{ top: '57%', left: '13%', x: '0%', y: '0%', opacity: 1 }}
        animate={{ top: '57%', left: '47%', x: '0%', y: '0%', opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="w-60 h-60 bg-primary rounded-full blur-3xl opacity-50" />
      </motion.div>
      <TextInput onSubmit={handleSubmission} />
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose an Image</DialogTitle>
            </DialogHeader>
            {isLoading ? (
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
                className="bg-secondary text-white px-4 py-2 rounded-lg"
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
