'use client'

import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF, GLTFExporter } from 'three-stdlib'
import { useCanvasContext } from '../contexts/canvas-context'
import { forwardRef, useEffect, useRef } from 'react'
import { Mesh } from 'three'

type GLTFResult2 = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
  }
  materials: {
    Mug_White: THREE.MeshStandardMaterial
  }
}

const Mug = forwardRef<Mesh>((_props, ref) => {
  const { nodes, materials } = useGLTF('/mug.glb') as GLTFResult2

  const { canvasUrl } = useCanvasContext()

  const testTexture = useTexture(canvasUrl || '/uv_texture.png')

  return (
    <group dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Mug_White}
            position={[0.182, -0.047, -0.06]}
            rotation={[0, Math.PI / 4, 0]}
            scale={[0.272, 0.315, 0.272]}
            ref={ref}
          >
            <meshStandardMaterial side={THREE.DoubleSide} />
            {canvasUrl && (
              <meshStandardMaterial map={testTexture} side={THREE.FrontSide} />
            )}
          </mesh>
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/mug.glb')

Mug.displayName = 'Mug'

export default Mug
