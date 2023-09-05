'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Center, OrbitControls } from '@react-three/drei'

import Mug from '../models/mug'
import Tshirt from '../models/tshirt'
import { ModelEnum } from '../contexts/model-enum'
import { useCanvasContext } from '../contexts/canvas-context'

const Editor = () => {
  const { modelType } = useCanvasContext()

  return (
    <Canvas
      shadows
      camera={{ fov: 45, position: [0, 0, 2] }}
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
        {modelType === ModelEnum.TSHIRT && <Tshirt />}
        {modelType === ModelEnum.MUG && <Mug />}
      </Center>
    </Canvas>
  )
}

export default Editor
