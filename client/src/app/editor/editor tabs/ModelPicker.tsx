import { useCanvasContext } from '../contexts/canvas-context'
import { ModelEnum } from '../contexts/model-enum'
import ModelButton from './model sheet/ModelButton'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './model sheet/Sheet'

interface ModelPickerProps {
  button: React.ReactNode
}

const ModelPicker = ({ button }: ModelPickerProps) => {
  const Models: ModelEnum[] = [
    ModelEnum.MUG,
    ModelEnum.TSHIRT,
    ModelEnum.POSTERFRAME,
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>{button}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Choose another model</SheetTitle>
          {/* <SheetDescription>
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {Models.map((model) => (
            <ModelButton key={model} newModel={model} />
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ModelPicker
