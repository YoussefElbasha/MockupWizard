'use client'

import * as THREE from 'three'
import React, { use, useEffect, useRef } from 'react'
import { Box, Decal, useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import Sticker from './sticker'
import { full } from '@cloudinary/url-gen/qualifiers/fontHinting'
import { fabric } from 'fabric'

interface ShirtProps {
  color?: string
}

const TestBox = ({ color }: ShirtProps) => {
  const fullTexture = useTexture('/uv_texture.png')
  const logoTexture = useTexture('/strawhat.png')

  // var canvas = new fabric.Canvas('canvas')
  // // , {
  // //   backgroundColor: 'transparent',
  // //   width: 500,
  // //   height: 500,
  // // })

  // const imageTest = fabric.Image.fromURL(
  //   'https://upload.wikimedia.org/wikipedia/commons/archive/b/bd/20230823101326%21Test.svg',
  //   function (img) {
  //     try {
  //       img.set({
  //         left: 0,
  //         top: 0,
  //         width: canvas.width,
  //         height: canvas.height,
  //       })

  //       console.log(img)
  //       return img
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // )

  // console.log(imageTest)
  // canvas.add(imageTest)

  // console.log(canvas.toDataURL())

  // // // Add the second texture to the canvas
  // // fabric.Image.fromURL('/strawhat.png', function (img) {
  // //   img.set({
  // //     left: 0,
  // //     top: 0,
  // //   })
  // //   canvas.add(img)
  // // })

  return (
    <group dispose={null}>
      <Box>
        <meshStandardMaterial map={fullTexture} side={2} />
        {/* <meshStandardMaterial map={logoTexture} side={2} /> */}
        <Decal
          map={logoTexture}
          position={[0, 0, 0]}
          scale={1}
          onClick={() => console.log('clicked')}
        />
        {/* <Sticker
          url="/uv_texture.png"
          position={[0, 0, 0]}
          // rotation={[0, 0, 0]}
          scale={1}
        /> */}
      </Box>
    </group>
  )
}

export default TestBox
