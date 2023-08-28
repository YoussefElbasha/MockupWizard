'use client'

import { createContext, useContext, useState } from 'react'
import { Euler, Vector3 } from 'three'

type DesignContextProviderProps = {
  children: React.ReactNode
}

type DesignContext = {
  position: Vector3
  setPosition: React.Dispatch<React.SetStateAction<Vector3>>
  rotation: Euler
  setRotation: React.Dispatch<React.SetStateAction<Euler>>
  scale: number
  setScale: React.Dispatch<React.SetStateAction<number>>
}

const DesignContext = createContext<DesignContext | null>(null)

const DesignContextProvider = ({ children }: DesignContextProviderProps) => {
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0.1))
  const [rotation, setRotation] = useState<Euler>(new Euler(0, 0, 0, 'XYZ'))
  const [scale, setScale] = useState<number>(1)

  return (
    <DesignContext.Provider
      value={{ position, setPosition, rotation, setRotation, scale, setScale }}
    >
      {children}
    </DesignContext.Provider>
  )
}

const useDesignContext = () => {
  const context = useContext(DesignContext)
  if (!context) {
    throw new Error(
      'useDesignContext must be used within a DesignContextProvider'
    )
  }
  return context
}

export { DesignContext, DesignContextProvider, useDesignContext }
