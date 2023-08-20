import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import Sticker from './sticker'

type GLTFResult = GLTF & {
  nodes: {
    bunny: THREE.Mesh
  }
  materials: {
    ['Default OBJ']: THREE.MeshStandardMaterial
  }
}

const Bunny = () => {
  const { nodes, materials } = useGLTF('/bunny.gltf') as GLTFResult
  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.bunny.geometry}>
        <meshStandardMaterial color="black" />
        <Sticker
          url="/strawhat.png"
          position={[-0.1, 1.3, 0.55]}
          rotation={Math.PI * 1.5}
          scale={1}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/model.gltf')

export default Bunny
