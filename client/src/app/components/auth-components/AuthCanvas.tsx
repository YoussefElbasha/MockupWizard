import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import "../../globals.css";

function Model(props: any) {
  const { scene } = useGLTF("/shirt_baked.glb");
  const { color } = props;

  // Traverse the scene and modify the existing material properties
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      if (child.material instanceof MeshStandardMaterial) {
        child.material.color.set(color);
      }
    }
  });

  return <primitive object={scene} {...props} />;
}

const MyMesh = () => {
  const mesh = useRef<Mesh>(null);
  const [color, setColor] = useState<string>("#DDA82A");
  const material = new MeshStandardMaterial({ color: color }); // Create material outside render function

  const handleClick = () => {
    // Generate a random color in hexadecimal format
    const randomColor = "#" + ((Math.random() * 0xffffff) | 0).toString(16);
    setColor(randomColor);
  };

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.5; // Adjust the rotation speed using delta
      mesh.current.position.y = Math.cos(state.clock.getElapsedTime()) * 0.0003;
    }
  });

  return (
    <mesh
      ref={mesh}
      onClick={handleClick}
      material={material} // Use the consistent material
    >
      <Stage preset="upfront" environment={"warehouse"} intensity={0.05}>
        <Model color={color} scale={0.01} />
      </Stage>
    </mesh>
  );
};

function AuthCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 20 }}
      style={{ width: "400px", height: "400px" }}
      className="custom-cursor"
    >
      <ambientLight />
      <MyMesh />
    </Canvas>
  );
}

export default AuthCanvas;
