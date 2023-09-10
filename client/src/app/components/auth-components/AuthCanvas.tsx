import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import "../../globals.css";

function Model(props: any) {
  const { scene } = useGLTF("/shirt_baked.glb");
  return <primitive object={scene} {...props} />;
}

const MyMesh = () => {
  const mesh = useRef<Mesh>(null);
  const [color, setColor] = useState<string>("#DDA82A");

  const handleClick = () => {
    console.log("Clicked!");
    // Generate a random color in hexadecimal format
    const randomColor = "#" + ((Math.random() * 0xffffff) | 0).toString(16);
    console.log(randomColor);
    setColor(randomColor);
  };

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      if (mesh.current.material instanceof MeshStandardMaterial) {
        mesh.current.material.color.set(color);
      }
    }
  });

  return (
    <mesh
      ref={mesh}
      onClick={handleClick}
      material={new MeshStandardMaterial({ color: color })}
    >
      <Stage preset="upfront" environment={"warehouse"} intensity={0.05}>
        <Model scale={0.01} />
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
