'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'

import Mug2 from '../models/mug_2'
import { forwardRef } from 'react'

const Editor = forwardRef<HTMLCanvasElement>((_props, ref) => {
  return (
    <Canvas
      shadows
      camera={{ fov: 45 }}
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
        <Mug2 />
      </Center>
    </Canvas>
  )
})

Editor.displayName = 'Editor'

export default Editor
