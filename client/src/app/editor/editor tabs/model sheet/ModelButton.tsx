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
        <button className="relative w-full rounded-lg bg-black h-[10em] overflow-hidden">
          Show Dialog
          <Image src="/pepeWizard.png" fill alt="model picture" />
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
