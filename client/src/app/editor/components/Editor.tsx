'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'
import { ModelEnum } from '../contexts/model-enum'
import { useCanvasContext } from '../contexts/canvas-context'
import { forwardRef } from 'react'
import PosterFrame from '../models/PosterFrame'
import Tshirt from '../models/tshirt'
import Mug from '../models/mug'

interface EditorProps {
  meshRef: React.MutableRefObject<any>
}

const Editor = forwardRef<HTMLCanvasElement, EditorProps>((props, ref) => {
  const { modelType } = useCanvasContext()

  return (
    <Canvas
      shadows
      camera={{ fov: 45, position: [0, 0, 2] }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
      style={{ background: '#ffffff' }}
      ref={ref}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      {/* <directionalLight
        position={[5, 10, -10]}
        intensity={1}
        color={'green'}
      /> */}
      {/* <spotLight position={[-10, 10, 10]} intensity={10} color={'green'} /> */}
      {/* <directionalLight position={[5, 10, 10]} intensity={1} /> */}

      {/* <OrbitControls minDistance={1} maxDistance={6} zoomSpeed={2} /> */}
      <OrbitControls zoomSpeed={2} />

      {/* <Backdrop /> */}
      <Center>
        {modelType === ModelEnum.TSHIRT && <Tshirt ref={props.meshRef} />}
        {modelType === ModelEnum.MUG && <Mug ref={props.meshRef} />}
        {modelType === ModelEnum.POSTERFRAME && (
          <PosterFrame ref={props.meshRef} />
        )}
      </Center>
    </Canvas>
  )
})

Editor.displayName = 'Editor'

export default Editor
