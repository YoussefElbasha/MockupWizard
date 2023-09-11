'use client'
import toast from 'react-hot-toast'
import ImageCard from './components/imagecard'
import TextInput from './components/TextInput'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import api from '../../../../../util/Axios'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useSWRMutation from 'swr/mutation'
import { Save } from 'react-ionicons'
import { useCanvasContext } from '../../contexts/canvas-context'
import axios from 'axios'

const Dalle = () => {
  const [urls, setUrls] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { setDesigns, canvasObjects, setCanvasObjects } = useCanvasContext()

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/editor/generate-image`,
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

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleConfirm = async () => {
    // Perform actions when the user confirms their choice
    try {
      if (selectedImage) {
        const formData = new FormData()
        console.log(selectedImage)
        formData.append('file', selectedImage)
        formData.append('upload_preset', 'model_designs')

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dfbid2goy/image/upload',
          formData
        )

        const path = res.data.secure_url.replace(
          'https://res.cloudinary.com/',
          '/image/'
        )

        setDesigns((prev: any) => [
          ...canvasObjects,
          {
            url: path,
            top: 150,
            left: 150,
            scale: 100,
            rotation: 0,
          },
        ])

        setCanvasObjects((prev: any) => [
          ...canvasObjects,
          {
            url: path,
            top: 150,
            left: 150,
            scale: 100,
            rotation: 0,
          },
        ])
      } else {
        console.log('No image selected')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
    setIsDialogOpen(false) // Close the dialog
  }

  const handleImageClick = (imageUrl: string) => {
    // Update the selected image when the user clicks on an image
    setSelectedImage(imageUrl)
    console.log('Selected image:', imageUrl)
  }

  return (
    <div>
      <TextInput
        onSubmit={(prompt) => {
          setIsDialogOpen(true)
          trigger(prompt)
        }}
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

export default Dalle
