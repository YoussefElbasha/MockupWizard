'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'
import { ModelEnum } from '../contexts/model-enum'
import { useCanvasContext } from '../contexts/canvas-context'
import { forwardRef } from 'react'
import Loader from '@/components/loader'
import Tshirt from '../models/tshirt'
import Mug from '../models/mug'

interface EditorProps {
  id?: string
  meshRef: React.MutableRefObject<any>
}

const Editor = forwardRef<HTMLCanvasElement, EditorProps>((props, ref) => {
  const { modelType, modelLoading } = useCanvasContext()

  if (modelLoading)
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-screen bg-black">
        <Loader />
      </div>
    )

  if (!modelType)
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-screen bg-black">
        <p className="text-white">Failed to load model</p>
      </div>
    )

  return (
    <Canvas
      id={props.id ?? 'editor-canvas'}
      shadows
      camera={{ fov: 45, position: [0, 0, 2] }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full max-w-full transition-all ease-in"
      style={{ background: '#ffffff' }}
      ref={ref}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <OrbitControls zoomSpeed={2} />
      <Center>
        {modelType === ModelEnum.TSHIRT && <Tshirt ref={props.meshRef} />}
        {modelType === ModelEnum.MUG && <Mug ref={props.meshRef} />}
      </Center>
    </Canvas>
  )
})

Editor.displayName = 'Editor'

export default Editor
