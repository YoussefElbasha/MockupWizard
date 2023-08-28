'use client'

import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import THREE from 'three'
import Sticker from './sticker'

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh
  }
  materials: {
    lambert1: THREE.MeshStandardMaterial
  }
}

interface ShirtProps {
  color: string
}

const Shirt = ({ color }: ShirtProps) => {
  const { nodes, materials } = useGLTF('/shirt_baked.glb') as GLTFResult

  const logoTexture = useTexture('/strawhat.png')
  const fullTexture = useTexture('/uv_texture.png')

  logoTexture.offset.x = 0.1

  return (
    <group>
      <mesh
        // castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-color={color}
        material-roughness={1}
        dispose={null}
      >
        <meshStandardMaterial map={fullTexture} side={2} />
        <Decal
          map={logoTexture}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[0.3, 0.3, 1]}
          onClick={() => console.log('clicked')}
        />
      </mesh>
    </group>
  )
}

export default Shirt
