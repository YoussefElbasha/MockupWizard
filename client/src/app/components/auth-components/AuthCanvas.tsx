import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Stage } from "@react-three/drei"
import { useRef } from "react"
import { Mesh, MeshStandardMaterial } from "three"

function Model(props: any){
  const { scene } = useGLTF('/shirt_baked.glb');
  
  // Traverse the scene and modify the existing material properties
  scene.traverse(child => {
    if (child instanceof Mesh) {
      if (child.material instanceof MeshStandardMaterial) {
        child.material.color.set('red');
      }
    }
  });

  return <primitive object={scene} {...props} />
}

const MyMesh = () => {
  const mesh = useRef<Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={mesh}>
      <Stage preset="soft" environment={'night'} intensity={0.1}>
        <Model scale={0.01} />
      </Stage>
    </mesh>
  )
}

function AuthCanvas() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 10 }} style={{ width: '500px', height: '500px', position: 'absolute' }}>
      <MyMesh />
    </Canvas>
  );
}

export default AuthCanvas;