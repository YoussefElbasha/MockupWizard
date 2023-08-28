'use client'

import { fabric } from 'fabric'
import { useCanvasContext } from '../contexts/canvas-context'
import { use, useEffect, useRef } from 'react'

const TestCanvas = () => {
  const { canvasUrl, setCanvasUrl, canvas, setCanvas } = useCanvasContext()

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: `white`,
      preserveObjectStacking: false,

      width: 200,
      height: 200,
    })

    fabric.Image.fromURL('/strawhat.png', function (img) {
      try {
        img.crossOrigin = 'anonymous'
        img.scaleToWidth(200 / 2)
        img.set({
          left: 200 * 0.5,
          top: 200 * 0.15,
          originX: 'center',
          originY: 'center',
        })
        canvas.add(img)
      } catch (error) {
        console.log(error)
      }
    })

    fabric.Image.fromURL('/cooldude.png', function (img) {
      try {
        img.crossOrigin = 'anonymous'
        img.scaleToWidth(200 / 2)
        img.set({
          left: 200 * 0.5,
          top: 200 * 0.15,
          originX: 'center',
          originY: 'center',
        })
        canvas.add(img)
      } catch (error) {
        console.log(error)
      }
    })

    canvas.on('object:modified', function (e) {
      console.log('modified')
      canvas.getActiveObject()?.bringToFront()
      setCanvasUrl(canvas.toDataURL())

      // canvasTest.getObjects().forEach((obj, index) => {
      //   console.log(`${index} `, obj.left, obj.top)
      // })
    })

    canvas.on('selection:created', function (event) {
      console.log('selected')
      canvas.getActiveObject()?.bringToFront()
      setCanvasUrl(canvas.toDataURL())
    })

    canvas.on('selection:updated', function (event) {
      console.log('selected')
      canvas.getActiveObject()?.bringToFront()
      setCanvasUrl(canvas.toDataURL())
    })

    return () => {
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    console.log('canvasUrl', canvasUrl)
  }, [canvasUrl])
  // setCanvasUrl(canvasTest.toDataURL())

  // const saveCanvas = () => {
  //   console.log('save')
  //   setCanvasUrl(canvasTest.toDataURL())
  // }

  return <canvas id="canvas" width="500" height="500"></canvas>
}

export default TestCanvas
