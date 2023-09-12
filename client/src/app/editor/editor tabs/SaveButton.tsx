import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/Hover'
import axios from 'axios'
import { Save } from 'react-ionicons'
import useSWRMutation from 'swr/mutation'
import { useCanvasContext } from '../contexts/canvas-context'
import Loader from '@/components/loader'
import { useEffect, useRef, useState } from 'react'
import Editor from '../components/Editor'
// @ts-ignore
import { useScreenshot } from 'use-react-screenshot'
import toast from 'react-hot-toast'
import api from '../../../../util/Axios'

interface saveButtonProps {
  projectId: string
  meshRef: React.MutableRefObject<any>
}

const SaveButton = ({ projectId, meshRef }: saveButtonProps) => {
  const { color, canvasObjects, modelType } = useCanvasContext()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [_, takeScreenshot] = useScreenshot()
  const screenshotContainerRef = useRef<HTMLDivElement>(null)

  const handleSave = () => {
    setIsSaving(true)
  }

  useEffect(() => {
    if (!isSaving) return
    if (!screenshotContainerRef.current) return

    const timeout = setTimeout(async () => {
      const image = await takeScreenshot(screenshotContainerRef.current)

      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', 'model_designs')

      try {
        const {
          data: { secure_url: url },
        } = await axios.post(
          'https://api.cloudinary.com/v1_1/dfbid2goy/image/upload',
          formData
        )

        await api.post(
          `${process.env.NEXT_PUBLIC_API_URL}/editor/${projectId}`,
          {
            color,
            designs: canvasObjects,
            modelType,
            thumbnail: url,
          }
        )

        toast.success('Design saved')
      } catch (error) {
        toast.error('Failed to save design')
      } finally {
        setIsSaving(false)
      }
    }, 1000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaving, screenshotContainerRef])

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <button
              className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
              onClick={() => handleSave()}
            >
              <p className="sr-only">Save Button</p>
              <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300 ">
                {!isSaving ? (
                  <Save
                    style={{ fill: 'black', height: '2em', width: '2em' }}
                  />
                ) : (
                  <div className="w-full -translate-x-1.5 h-full flex items-center justify-center">
                    <Loader className="before:!border-black before:!border-[4px] !w-8 !h-8" />
                  </div>
                )}
              </div>
            </button>
            {isSaving && (
              <div
                ref={screenshotContainerRef}
                className="fixed left-[100vw] w-[1000px] h-[1000px] bg-red-400 -top-52"
              >
                <Editor id="save-canvas-editor" meshRef={meshRef} />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={-45}
          alignOffset={75}
          align="start"
          avoidCollisions={false}
        >
          <p>Save Project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default SaveButton
