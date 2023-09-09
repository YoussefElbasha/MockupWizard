import * as THREE from 'three'
import React, { forwardRef, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useCanvasContext } from '../contexts/canvas-context'
import { Mesh } from 'three'

type GLTFResult = GLTF & {
  nodes: {
    T_Shirt_male: THREE.Mesh
  }
  materials: {
    lambert1: THREE.MeshStandardMaterial
  }
}

const Tshirt = forwardRef<Mesh>((_props, ref) => {
  const { nodes, materials } = useGLTF('/tshirt.glb') as GLTFResult

  const { canvasUrl } = useCanvasContext()
  const testTexture = useTexture(canvasUrl || '/uv_texture.png', (t) => {
    if (!Array.isArray(t)) {
      t.flipY = false
    }
  })

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        ref={ref}
      >
        {canvasUrl && (
          <meshStandardMaterial map={testTexture} side={THREE.DoubleSide} />
        )}
      </mesh>
    </group>
  )
})

useGLTF.preload('/tshirt.glb')

Tshirt.displayName = 'Tshirt'

export default Tshirt
