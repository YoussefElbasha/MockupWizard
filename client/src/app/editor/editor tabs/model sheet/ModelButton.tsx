import Image from 'next/image'
import { ModelEnum } from '../../contexts/model-enum'
import { useCanvasContext } from '../../contexts/canvas-context'
import { set } from 'react-hook-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './Alert'
import { useState } from 'react'

interface ModelButtonProps {
  newModel: ModelEnum
}

const ModelButton = ({ newModel }: ModelButtonProps) => {
  const [open, setOpen] = useState(false)
  const { modelType, setModelType } = useCanvasContext()

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (newModel === modelType) {
          setOpen(false)
        } else {
          setOpen(open)
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <button
          className={`relative w-full rounded-lg bg-black h-[10em] overflow-hidden group after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/50 after:to-black/0 after:opacity-0 hover:after:opacity-100 after:transition-all after:ease-in-out after:duration-300 ${
            newModel === modelType ? 'border-4 border-secondary' : ''
          }`}
        >
          <p className="absolute top-1/2 translate-y-[calc(-50%+2.5rem)] left-0 right-0 text-center z-10 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 text-white font-semibold text-lg">
            {ModelEnum[newModel].charAt(0).toUpperCase() +
              ModelEnum[newModel].slice(1).toLowerCase()}
          </p>
          <Image
            src={`/model screenshots/${newModel}.jpeg`}
            fill
            alt={ModelEnum[newModel]}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will result in all designs being reset to their default
            position, rotation and scale.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setModelType(newModel)
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModelButton
