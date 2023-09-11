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
import api from '../../../../util/Axios'

interface saveButtonProps {
  projectId: string
}

const SaveButton = ({ projectId }: saveButtonProps) => {
  const { color, canvasObjects, modelType } = useCanvasContext()

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/editor/${projectId}`,
    (url: string) => {
      return api.post(url, { color, designs: canvasObjects, modelType })
    }
  )

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <button
              className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
              onClick={() => trigger()}>
              <p className="sr-only">Save Button</p>
              <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300 ">
                {isMutating === false ? (
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
          </div>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={-45}
          alignOffset={75}
          align="start"
          avoidCollisions={false}>
          <p>Save Project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default SaveButton
