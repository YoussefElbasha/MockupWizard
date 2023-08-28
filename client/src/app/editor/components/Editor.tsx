'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'

import Shirt from './Shirt'
import Mug from './mug'
import Bunny from './bunny'
import Mug2 from './mug_2'
import TestBox from './box'
import Tshirt2 from './tshirt2'

interface EditorProps {
  color: string
  designs?: string[]
}

const Editor = ({ color, designs }: EditorProps) => {
  return (
    <Canvas
      shadows
      camera={{ fov: 50 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
      style={{ background: '#ffffff' }}
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
        {/* <Shirt color={color} /> */}
        {/* <Tshirt2 /> */}
        {/* <Mug color={color} /> */}
        <Mug2 color={color} designs={designs} />
        {/* <TestBox /> */}
        {/* <Bunny /> */}
      </Center>
    </Canvas>
  )
}

export default Editor
