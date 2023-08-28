'use client'

import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { useTexture } from '@react-three/drei'
import { fabric } from 'fabric'
import { useFabricContext } from '../contexts/fabric-context'
import { string } from 'yup'
import { stringOrNumber } from '@cloudinary/url-gen/types/types'

type CanvasProps = {
  designs: string[]
  color: stringOrNumber
}

const Canvas = ({ designs, color }: CanvasProps) => {
  const { xPosition, yPosition, rotation, scale } = useFabricContext()

  const [testTexture, setTestTexture] = useState<THREE.Texture>(
    useTexture('/uv_texture.png')
  )

  useEffect(() => {
    initCanvas()
    console.log('canvas updated')
  }, [xPosition, yPosition, rotation, scale, designs, color])

  const initCanvas = () => {
    var canvasTest = new fabric.Canvas('canvas', {
      backgroundColor: `${color}`,
      width: 500,
      height: 500,
    })

    designs.forEach((design, index) => {
      fabric.Image.fromURL(design, function (img) {
        try {
          img.crossOrigin = 'anonymous'
          img.scaleToWidth(500 / scale[index])
          img.rotate(-rotation[index])
          img.bringForward()
          img.set({
            // lockMovementX: true,
            // lockMovementY: true,
            left: 500 * xPosition[index],
            top: 500 * yPosition[index],
            originX: 'center',
            originY: 'center',
          })
          canvasTest.add(img)
          const newTexture = new THREE.TextureLoader().load(
            canvasTest.toDataURL()
          )

          console.log(canvasTest.getObjects())

          setTestTexture(newTexture)
        } catch (error) {
          console.log(error)
        }
      })
    })
  }

  return testTexture
}

export default Canvas
