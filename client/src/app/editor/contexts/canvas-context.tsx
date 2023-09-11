'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { ModelEnum } from './model-enum'
import useSWR from 'swr'
import axios from 'axios'

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
  modelType?: ModelEnum
  setModelType: React.Dispatch<React.SetStateAction<ModelEnum | undefined>>
  modelLoading: boolean
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
  const [modelType, setModelType] = useState<ModelEnum | undefined>(undefined)
  const [modelLoading, setModelLoading] = useState<boolean>(true)

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/editor/${projectId}`,
    (url: string) => {
      return axios.get(url)
    },
    {
      onError: () => {
        setModelLoading(false)
      },
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  useEffect(() => {
    if (!data) return

    const { data: modelData } = data
    if (!modelData) return

    setModelType(modelData.modelType)
    setColor(modelData.color)
    const modelDesigns = modelData.designs.map((design: any) => {
      return {
        url: design.designUrl.replace('https://res.cloudinary.com/', '/image/'),
        top: design.top,
        left: design.left,
        scale: design.scale,
        rotation: design.rotation,
      }
    })

    setCanvasObjects(modelDesigns)
    setDesigns(modelDesigns)
    setModelLoading(false)
  }, [data])

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
        modelLoading,
      }}>
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
