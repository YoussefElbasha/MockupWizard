'use client'

import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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
  // const fullTexture = useTexture('/strawhat.png')

  logoTexture.offset()

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
        <Decal
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          map={logoTexture}
          depthTest={false}
        />
      </mesh>
    </group>
  )
}

export default Shirt
