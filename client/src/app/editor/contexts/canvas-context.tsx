'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ModelEnum } from './model-enum'
import useSWR from 'swr'
import axios from 'axios'
import { set } from 'react-hook-form'
import { clsx } from 'clsx'

type CanvasContextProviderProps = {
  children: React.ReactNode
  projectId: string
}

type CanvasContext = {
  canvas: fabric.Canvas | null
  setCanvas: React.Dispatch<React.SetStateAction<fabric.Canvas | null>>
  canvasUrl: string
  setCanvasUrl: React.Dispatch<React.SetStateAction<string>>
  canvasObjects: any
  setCanvasObjects: any
  designs: any
  setDesigns: any
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
  modelType: ModelEnum
  setModelType: React.Dispatch<React.SetStateAction<ModelEnum>>
}

const CanvasContext = createContext<CanvasContext | null>(null)

const CanvasContextProvider = ({
  children,
  projectId,
}: CanvasContextProviderProps) => {
  const [canvasUrl, setCanvasUrl] = useState<string>('')
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [designs, setDesigns] = useState<any>([])
  const [canvasObjects, setCanvasObjects] = useState<any>([])
  const [color, setColor] = useState('#fff')
  const [modelType, setModelType] = useState<ModelEnum>(ModelEnum.TSHIRT)

  const [modelData, setModelData] = useState<any>(null)

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/editor/${projectId}`,
    (url: string) => {
      return axios
        .get(url)
        .then((res) => {
          setModelData(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  )

  useEffect(() => {
    if (modelData) {
      setModelType(modelData.modelType)
      setColor(modelData.color)
      const modelDesigns = modelData.designs.map((design: any) => {
        return {
          url: design.designUrl.replace(
            'https://res.cloudinary.com/',
            '/image/'
          ),
          top: design.top,
          left: design.left,
          scale: design.scale,
          rotation: design.rotation,
        }
      })
      setCanvasObjects(modelDesigns)
      setDesigns(modelDesigns)
    }
  }, [modelData])

  useEffect(() => {
    if (canvasObjects.length > 0) {
      setCanvasObjects(
        canvasObjects.map((object: any) => {
          return {
            url: object.url,
            top: 100,
            left: 100,
            scale: 100,
            rotation: 0,
          }
        })
      )
    }

    if (designs.length > 0) {
      setDesigns(
        designs.map((object: any) => {
          return {
            url: object.url,
            top: 100,
            left: 100,
            scale: 100,
            rotation: 0,
          }
        })
      )
    }
  }, [modelType])

  return (
    <CanvasContext.Provider
      value={{
        canvasUrl,
        setCanvasUrl,
        canvas,
        setCanvas,
        designs,
        setDesigns,
        canvasObjects,
        setCanvasObjects,
        color,
        setColor,
        modelType,
        setModelType,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

const useCanvasContext = () => {
  const context = useContext(CanvasContext)
  if (!context) {
    throw new Error(
      'useCanvasContext must be used within a CanvasContextProvider'
    )
  }
  return context
}

export { CanvasContext, CanvasContextProvider, useCanvasContext }
