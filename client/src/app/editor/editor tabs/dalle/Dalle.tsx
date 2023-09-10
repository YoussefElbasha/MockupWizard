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
  const { setDesigns, canvasObjects } = useCanvasContext()

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
        formData.append(
          'file',
          'https://dalleproduse.blob.core.windows.net/private/images/dc435ca2-7d52-4793-8d48-61064cd5f370/generated_00.png?se=2023-09-10T16%3A08%3A04Z&sig=Pulj%2BWt9K0ZpPrrCuSqKJos64ZnG86SSpqBrBJxltAY%3D&ske=2023-09-16T12%3A43%3A34Z&skoid=09ba021e-c417-441c-b203-c81e5dcd7b7f&sks=b&skt=2023-09-09T12%3A43%3A34Z&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skv=2020-10-02&sp=r&spr=https&sr=b&sv=2020-10-02'
        )
        formData.append('upload_preset', 'model_designs')

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dfbid2goy/image/upload',
          formData
        )

        const path = res.data.url.replace(
          'http://res.cloudinary.com/',
          '/image/'
        )

        setDesigns((prev: any) => [
          ...canvasObjects,
          {
            url: path,
            top: 100,
            left: 100,
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

export default Dalle
