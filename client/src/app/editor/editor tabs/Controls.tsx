import React from 'react'
import {
  CaretUp,
  CaretDown,
  CaretBack,
  CaretForward,
  AddOutline,
  RemoveOutline,
} from 'react-ionicons'

import Rotate from '../../icons/clockwise-fill.svg'
import { useDesignContext } from '../contexts/design-context'
import { Euler, Vector3 } from 'three'

const Controls = () => {
  const { setPosition, setRotation, setScale } = useDesignContext()

  return (
    <div className="bg-white w-40 h-40 relative rounded-xl shadow-xl">
      <CaretUp
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute top-[5%] left-1/2 transform -translate-x-1/2 '
        }
        onClick={() => {
          setPosition(
            (prevState) =>
              new Vector3(
                prevState.getComponent(0),
                prevState.getComponent(1) + 0.1,
                prevState.getComponent(2)
              )
          )
        }}
      />
      <CaretDown
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute bottom-[5%] left-1/2 transform -translate-x-1/2 '
        }
        onClick={() => {
          setPosition(
            (prevState) =>
              new Vector3(
                prevState.getComponent(0),
                prevState.getComponent(1) - 0.1,
                prevState.getComponent(2)
              )
          )
        }}
      />
      <CaretBack
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute top-1/2 left-[5%] transform -translate-y-1/2'
        }
        onClick={() => {
          setPosition(
            (prevState) =>
              new Vector3(
                prevState.getComponent(0) - 0.1,
                prevState.getComponent(1),
                prevState.getComponent(2)
              )
          )
        }}
      />
      <CaretForward
        cssClasses={
          '!fill-black !h-[4em] !w-[4em] absolute top-1/2 right-[5%] transform -translate-y-1/2'
        }
        onClick={() =>
          setPosition(
            (prevState) =>
              new Vector3(
                prevState.getComponent(0) + 0.1,
                prevState.getComponent(1),
                prevState.getComponent(2)
              )
          )
        }
      />
      <AddOutline
        cssClasses="!fill-black !h-[4em] !w-[4em] absolute right-0"
        onClick={() => setScale((prevState) => prevState + 0.1)}
      />
      <RemoveOutline
        cssClasses="!fill-black !h-[4em] !w-[4em] absolute"
        onClick={() => setScale((prevState) => prevState - 0.01)}
      />
      <Rotate
        className="!fill-black !h-[3em] !w-[3em] absolute bottom-0 rotate-180"
        onClick={() =>
          setRotation(
            (prevState) =>
              new Euler(prevState.x, prevState.y, prevState.z + 0.1, 'XYZ')
          )
        }
      />
      <Rotate
        className="!fill-black !h-[3em] !w-[3em] absolute bottom-0 right-0 scale-y-[-1]"
        onClick={() =>
          setRotation(
            (prevState) =>
              new Euler(prevState.x, prevState.y, prevState.z - 0.1, 'XYZ')
          )
        }
      />
    </div>
  )
}

export default Controls
