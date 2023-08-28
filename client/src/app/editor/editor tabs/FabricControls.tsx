'use client'

import {
  CaretUp,
  CaretDown,
  CaretBack,
  CaretForward,
  AddOutline,
  RemoveOutline,
  TrashOutline,
} from 'react-ionicons'

import Rotate from '../../icons/clockwise-fill.svg'
import { useFabricContext } from '../contexts/fabric-context'

type FabricControlsProps = {
  index: number
  setDesigns: React.Dispatch<React.SetStateAction<string[]>>
}

const FabricControls = ({ index, setDesigns }: FabricControlsProps) => {
  const { setXPosition, setYPosition, setRotation, setScale } =
    useFabricContext()

  return (
    <div className="bg-white w-40 h-40 relative rounded-xl shadow-xl">
      <TrashOutline
        cssClasses="!fill-black !h-[2em] !w-[2em] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        onClick={() => {
          setDesigns((prevState) => {
            const updatedArray = [...prevState]
            updatedArray.splice(index, 1)
            return updatedArray
          })
        }}
      />
      <CaretUp
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute top-[5%] left-1/2 transform -translate-x-1/2 '
        }
        onClick={() => {
          setYPosition((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] - 0.01
            return updatedArray
          })
        }}
      />
      <CaretDown
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute bottom-[5%] left-1/2 transform -translate-x-1/2 '
        }
        onClick={() => {
          setYPosition((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] + 0.01
            return updatedArray
          })
        }}
      />
      <CaretBack
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute top-1/2 left-[5%] transform -translate-y-1/2'
        }
        onClick={() => {
          setXPosition((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] - 0.01
            return updatedArray
          })
        }}
      />
      <CaretForward
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute top-1/2 right-[5%] transform -translate-y-1/2'
        }
        onClick={() =>
          setXPosition((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] + 0.01
            return updatedArray
          })
        }
      />
      <AddOutline
        cssClasses="!fill-black !h-[4em] !w-[4em] absolute right-0"
        onClick={() =>
          setScale((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] - 0.1
            return updatedArray
          })
        }
      />
      <RemoveOutline
        cssClasses="!fill-black !h-[4em] !w-[4em] absolute"
        onClick={() =>
          setScale((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] + 0.1
            return updatedArray
          })
        }
      />
      <Rotate
        className="!fill-black !h-[3em] !w-[3em] absolute bottom-0 rotate-180"
        onClick={() =>
          setRotation((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] - 1
            return updatedArray
          })
        }
      />
      <Rotate
        className="!fill-black !h-[3em] !w-[3em] absolute bottom-0 right-0 scale-y-[-1]"
        onClick={() =>
          setRotation((prevState) => {
            const updatedArray = [...prevState]
            updatedArray[index] = updatedArray[index] + 1
            return updatedArray
          })
        }
      />
    </div>
  )
}

export default FabricControls
