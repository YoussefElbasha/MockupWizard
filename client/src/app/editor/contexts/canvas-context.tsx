'use client'

import { createContext, useContext, useState } from 'react'

type CanvasContextProviderProps = {
  children: React.ReactNode
}

type CanvasContext = {
  canvas: fabric.Canvas | null
  setCanvas: React.Dispatch<React.SetStateAction<fabric.Canvas | null>>
  canvasUrl: string
  setCanvasUrl: React.Dispatch<React.SetStateAction<string>>
}

const CanvasContext = createContext<CanvasContext | null>(null)

const CanvasContextProvider = ({ children }: CanvasContextProviderProps) => {
  const [canvasUrl, setCanvasUrl] = useState<string>('')
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)

  return (
    <CanvasContext.Provider
      value={{
        canvasUrl,
        setCanvasUrl,
        canvas,
        setCanvas,
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
