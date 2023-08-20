'use client'

import * as THREE from 'three'
import React, { useRef } from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import Sticker from './sticker'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

interface ShirtProps {
  color: string
}

const Mug = ({ color }: ShirtProps) => {
  const { nodes, materials } = useGLTF('/plain_mug.glb') as GLTFResult
  const logoTexture = useTexture('/strawhat.png')

  return (
    <group dispose={null}>
      <mesh
        material-color={color}
        geometry={nodes.Object_2.geometry}
        material={materials['Material.001']}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {/* <Decal
          geometry={nodes.Object_2.geometry}
          position={[0.1, 0, 0]}
          rotation={[0, 0, 0]}
          // scale={[0.1, 0.1, 1]}
          scale={0.1}
          map={logoTexture}
        />

        <Sticker
          url="/strawhat.png"
          position={[0.1, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.2}
        /> */}
      </mesh>
    </group>
  )
}

useGLTF.preload('/plain_mug.glb')

export default Mug
