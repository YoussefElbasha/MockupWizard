'use client'

import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

import { useDesignContext } from '../contexts/design-context'
import { Euler } from 'three'

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
  const fullTexture = useTexture('/uv_texture.png')
  const logoTexture = useTexture('/strawhat.png')

  const { position, rotation, scale } = useDesignContext()

  return (
    <group dispose={null}>
      <mesh
        // material-color={color}
        geometry={nodes.Object_2.geometry}
        material={materials['Material.001']}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial side={THREE.FrontSide} map={fullTexture} />

        {/* <Decal
          debug
          geometry={nodes.Object_2.geometry}
          position={[0, -0.05, 0.1]}
          rotation={[1.5, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          map={logoTexture}
          onClick={() => console.log('clicked')}
        /> */}
        <Decal
          debug
          geometry={nodes.Object_2.geometry}
          position={position}
          rotation={rotation}
          // scale={scale}
          scale={0.1}
          map={logoTexture}
          onClick={() => console.log('clicked')}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/plain_mug.glb')

export default Mug
