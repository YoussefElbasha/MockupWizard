'use client'

import { Decal, useTexture } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import { Euler } from 'three'

type StickerProps = {
  url: string
  position: Vector3
  rotation: Euler
  scale: number
}

const Sticker = ({
  url,
  position,
  rotation,
  scale,
  ...props
}: StickerProps) => {
  const emoji = useTexture(url)
  return (
    <Decal
      debug={false}
      {...props}
      scale={scale}
      position={position}
      rotation={rotation}
    >
      <meshPhysicalMaterial
        transparent
        polygonOffset
        polygonOffsetFactor={-10}
        map={emoji}
        map-flipY={false}
        map-anisotropy={16}
        iridescence={1}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        roughness={1}
        clearcoat={0.5}
        metalness={0.75}
        toneMapped={false}
      />
    </Decal>
  )
}

export default Sticker
