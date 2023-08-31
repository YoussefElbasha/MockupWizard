'use client'

import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useCanvasContext } from '../contexts/canvas-context'

type GLTFResult2 = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
  }
  materials: {
    Mug_White: THREE.MeshStandardMaterial
  }
}

const Mug2 = () => {
  const { nodes, materials } = useGLTF('/ceramic_white_mug.glb') as GLTFResult2
  // const fullTexture = useTexture('/uv_texture.png')
  const fullTexture = useTexture('/testing.png')
  const logoTexture = useTexture('/strawhat.png')

  const { canvasUrl } = useCanvasContext()

  const testTexture = useTexture(canvasUrl || '/uv_texture.png')

  return (
    <group dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.Mug_White}
            position={[0, 8.17, -0.01]}
            rotation={[0, Math.PI / 4, 0]}
            scale={[7.066, 8.17, 7.066]}
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
}

useGLTF.preload('/plain_mug.glb')

export default Mug2
