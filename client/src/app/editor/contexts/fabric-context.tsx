'use client'

import { createContext, useContext, useState } from 'react'

type FabricContextProviderProps = {
  children: React.ReactNode
}

type FabricContext = {
  xPosition: number[]
  setXPosition: React.Dispatch<React.SetStateAction<number[]>>
  yPosition: number[]
  setYPosition: React.Dispatch<React.SetStateAction<number[]>>
  rotation: number[]
  setRotation: React.Dispatch<React.SetStateAction<number[]>>
  scale: number[]
  setScale: React.Dispatch<React.SetStateAction<number[]>>
}

const FabricContext = createContext<FabricContext | null>(null)

const FabricContextProvider = ({ children }: FabricContextProviderProps) => {
  const [xPosition, setXPosition] = useState<number[]>([0.5, 0.5, 0.5])
  const [yPosition, setYPosition] = useState<number[]>([0.15, 0.15, 0.15])
  const [rotation, setRotation] = useState<number[]>([0, 0, 0])
  const [scale, setScale] = useState<number[]>([2, 2, 2])

  return (
    <FabricContext.Provider
      value={{
        xPosition,
        setXPosition,
        yPosition,
        setYPosition,
        rotation,
        setRotation,
        scale,
        setScale,
      }}
    >
      {children}
    </FabricContext.Provider>
  )
}

const useFabricContext = () => {
  const context = useContext(FabricContext)
  if (!context) {
    throw new Error(
      'useFabricContext must be used within a FabricContextProvider'
    )
  }
  return context
}

export { FabricContext, FabricContextProvider, useFabricContext }
