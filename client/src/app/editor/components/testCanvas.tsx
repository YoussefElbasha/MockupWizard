'use client'

import { fabric } from 'fabric'
import { useCanvasContext } from '../contexts/canvas-context'
import { use, useEffect, useRef, useState } from 'react'
import MagicWand from '../../icons/magic-line.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseOutline, TrashOutline } from 'react-ionicons'
import { rectangle } from '@cloudinary/url-gen/qualifiers/region'

const TestCanvas = () => {
  const {
    canvasUrl,
    setCanvasUrl,
    canvas,
    setCanvas,
    designs,
    setDesigns,
    setCanvasObjects,
    canvasObjects,
    color,
    setColor,
  } = useCanvasContext()

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: `${color}`,
      width: 200,
      height: 200,
    })

    setCanvasObjects(designs)

    if (designs) {
      designs.forEach((design: any, index: any) => {
        console.log('hello here')
        fabric.Image.fromURL(design.url, function (img) {
          try {
            img.crossOrigin = 'anonymous'
            img.scaleToWidth(design.scale)
            img.rotate(design.rotation)
            img.set({
              left: design.left,
              top: design.top,
              originX: 'center',
              originY: 'center',
            })
            canvas.add(img)
          } catch (error) {
            console.log(error)
          }
        })
      })
    } else {
      console.log('hello')
      canvas.clear()
    }

    canvas.on('object:modified', function (e) {
      console.log('modified')
      canvas.getActiveObject()?.bringToFront()
      setCanvasUrl(canvas.toDataURL())
      setCanvasObjects(
        designs.map((design: any, index: any) => {
          return {
            url: design.url,
            top: canvas.getObjects()[index].top,
            left: canvas.getObjects()[index].left,
            scale: canvas.getObjects()[index].getScaledWidth(),
            rotation: canvas.getObjects()[index].angle,
          }
        })
      )
    })

    canvas.on('object:removed', function (e) {
      console.log('removed')
      setCanvasUrl(canvas.toDataURL())
      if (designs) {
        setCanvasObjects(
          designs.map((design: any, index: any) => {
            return {
              url: design.url,
              top: canvas.getObjects()[index].top,
              left: canvas.getObjects()[index].left,
              scale: canvas.getObjects()[index].getScaledWidth(),
              rotation: canvas.getObjects()[index].angle,
            }
          })
        )
        setDesigns(
          designs.map((design: any, index: any) => {
            return {
              url: design.url,
              top: canvas.getObjects()[index].top,
              left: canvas.getObjects()[index].left,
              scale: canvas.getObjects()[index].getScaledWidth(),
              rotation: canvas.getObjects()[index].angle,
            }
          })
        )
      } else {
        setCanvasObjects([])
        setDesigns([])
      }
    })

    canvas.on('selection:created', function (event) {
      console.log('selected')
      setCanvas(canvas)
      setIsSelected(true)
    })

    canvas.on('selection:updated', function (event) {
      console.log('updated')
      setCanvas(canvas)
      setIsSelected(true)
    })

    canvas.on('selection:cleared', function (event) {
      console.log('cleared')
      // setCanvas(null)
      setIsSelected(false)
    })

    // canvas.on('after:render', function (event) {
    //   canvas.getObjects().forEach((obj, index) => {
    //     !obj.isOnScreen()
    //   })
    // })

    return () => {
      canvas.dispose()
    }
  }, [designs, color])

  // useEffect(() => {
  //   console.log('canvasObjects', canvasObjects)
  // }, [canvasObjects])

  const deleteHandler = () => {
    const tempCanvasObjects = [...canvasObjects]
    canvas?.getActiveObjects().forEach((obj) => {
      const index = canvas?.getObjects().indexOf(obj)
      tempCanvasObjects.splice(index, 1)
    })
    if (designs) {
      setCanvasObjects(tempCanvasObjects)
      setDesigns(tempCanvasObjects)
    } else {
      console.log('I am here')
      setCanvasObjects([])
      setDesigns([])
    }
    setIsSelected(false)
  }

  const saveHandler = () => {
    console.log(canvasObjects)
  }

  const [isVisible, setIsVisible] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div className="absolute z-10 right-6 top-1/2">
      <div className="flex flex-row-reverse gap-6 items-center justify-center">
        <div className="flex flex-col gap-4">
          <button
            className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg "
            onClick={() => {
              setIsVisible(!isVisible)
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isVisible ? (
                <motion.div
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{
                    duration: 0.1,
                  }}
                  key={'close-icon'}
                >
                  <div className="hover:scale-[1.1] transition-all ease-in-out duration-300">
                    <CloseOutline
                      style={{ fill: 'black', height: '2.5em', width: '2.5em' }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{ scale: 0, rotate: -90 }}
                  transition={{
                    duration: 0.1,
                  }}
                  key={'color-picker-palette-icon'}
                >
                  <MagicWand
                    style={{ fill: 'black', height: '2.5em', width: '2.5em' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          {isSelected && (
            <button
              className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg "
              onClick={() => {
                deleteHandler()
              }}
            >
              <TrashOutline cssClasses="!fill-black !h-[2em] !w-[2em]" />
            </button>
          )}
        </div>
        <div
          className={`height-full border-black border-4 ${
            isVisible ? '' : 'hidden'
          }`}
        >
          <canvas
            id="canvas"
            width="500"
            height="500"
            className={` ${isVisible ? '' : 'hidden'}`}
          ></canvas>
        </div>
        {/* <button onClick={() => saveHandler()}>save</button> */}
        {/* <button onClick={() => deleteHandler()}>delete</button> */}
      </div>
    </div>
  )
}

export default TestCanvas
