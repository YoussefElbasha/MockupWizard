import * as THREE from 'three'
import React, { forwardRef, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Mesh } from 'three'
import { useCanvasContext } from '../contexts/canvas-context'

type GLTFResult = GLTF & {
  nodes: {
    Cube_Frame_0: THREE.Mesh
    Cube_Poster_0: THREE.Mesh
  }
  materials: {
    Frame: THREE.MeshStandardMaterial
    Poster: THREE.MeshStandardMaterial
  }
}

const PosterFrame = forwardRef<Mesh>((_props, ref) => {
  const { nodes, materials } = useGLTF('/poster_frame.glb') as GLTFResult

  const { canvasUrl } = useCanvasContext()

  const testTexture = useTexture(canvasUrl || '/uv_texture.png')
  return (
    <group dispose={null}>
      <group scale={0.01}>
        <group
          position={[0, 44.231, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[20, 0.5, 40]}
        >
          <mesh
            geometry={nodes.Cube_Frame_0.geometry}
            material={materials.Frame}
          />
          <mesh
            geometry={nodes.Cube_Poster_0.geometry}
            material={materials.Poster}
          >
            {canvasUrl && (
              <meshStandardMaterial map={testTexture} side={THREE.FrontSide} />
            )}
          </mesh>
        </group>
      </group>
    </group>
  )
})

// useGLTF.preload('/poster_frame.glb')

PosterFrame.displayName = 'PosterFrame'

export default PosterFrame
