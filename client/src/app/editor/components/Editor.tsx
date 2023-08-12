'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'

import Backdrop from './Backdrop'
import Shirt from './Shirt'
import CameraRig from './CameraRig'
//define props for Editor
interface EditorProps {
  color: string
}

const Editor = ({ color }: EditorProps) => {
  return (
    <Canvas
      shadows
      camera={{ fov: 10 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
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

      <OrbitControls minDistance={1} maxDistance={6} zoomSpeed={2} />

      {/* <Backdrop /> */}
      <Center>
        <Shirt color={color} />
      </Center>
    </Canvas>
  )
}

export default Editor
