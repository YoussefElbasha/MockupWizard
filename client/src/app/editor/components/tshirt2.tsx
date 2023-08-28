import * as THREE from 'three'
import React, { useRef } from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_6: THREE.Mesh
    Object_8: THREE.Mesh
    Object_10: THREE.Mesh
    Object_11: THREE.Mesh
    Object_12: THREE.Mesh
    Object_14: THREE.Mesh
    Object_15: THREE.Mesh
    Object_16: THREE.Mesh
    Object_18: THREE.Mesh
    Object_20: THREE.Mesh
  }
  materials: {
    Body_FRONT_2664: THREE.MeshStandardMaterial
    Sleeves_FRONT_2669: THREE.MeshStandardMaterial
  }
}

const Tshirt2 = () => {
  const { nodes, materials } = useGLTF('/t_shirt.glb') as GLTFResult
  const fullTexture = useTexture('/uv_texture.png')
  const logoTexture = useTexture('/strawhat.png')

  return (
    <group dispose={null}>
      {/* <group rotation={[-1.661, 0.003, -0.504]}>
        <group rotation={[Math.PI / 2, 0, 0]}> */}
      <mesh
        geometry={nodes.Object_6.geometry}
        material={materials.Body_FRONT_2664}
      >
        {/* <meshBasicMaterial color={'red'} /> */}
      </mesh>
      <mesh
        geometry={nodes.Object_8.geometry}
        material={materials.Body_FRONT_2664}
      >
        {/* <meshBasicMaterial color={'red'} /> */}
      </mesh>
      <mesh
        geometry={nodes.Object_10.geometry}
        material={materials.Body_FRONT_2664}
      >
        {/* <meshBasicMaterial color={'red'} /> */}
        <Decal
          geometry={nodes.Object_10.geometry}
          map={fullTexture}
          position={[0, 0, 0]}
          scale={1}
        />
      </mesh>
      <mesh
        geometry={nodes.Object_11.geometry}
        material={materials.Body_FRONT_2664}
      >
        {/* <meshBasicMaterial color={'red'} /> */}
        <Decal
          geometry={nodes.Object_10.geometry}
          map={fullTexture}
          position={[0, 0, 0]}
          scale={1}
        />
      </mesh>
      <mesh
        geometry={nodes.Object_12.geometry}
        material={materials.Body_FRONT_2664}
      >
        {/* <meshBasicMaterial color={'red'} /> */}
        <Decal
          geometry={nodes.Object_10.geometry}
          map={fullTexture}
          position={[0, 0, 0]}
          scale={1}
        />
      </mesh>
      <mesh
        geometry={nodes.Object_14.geometry}
        material={materials.Body_FRONT_2664}
      >
        {/* <meshStandardMaterial map={fullTexture} /> */}
        <Decal
          geometry={nodes.Object_10.geometry}
          map={logoTexture}
          position={[0, 1, 0]}
          scale={0.1}
        />
      </mesh>
      <mesh
        geometry={nodes.Object_15.geometry}
        material={materials.Body_FRONT_2664}
      />
      <mesh
        geometry={nodes.Object_16.geometry}
        material={materials.Body_FRONT_2664}
      />
      <mesh
        geometry={nodes.Object_18.geometry}
        material={materials.Sleeves_FRONT_2669}
      />
      <mesh
        geometry={nodes.Object_20.geometry}
        material={materials.Sleeves_FRONT_2669}
      />
      {/* </group>
      </group> */}
    </group>
  )
}

useGLTF.preload('/t_shirt.glb')

export default Tshirt2
