'use client'

import { useState } from 'react'
import Editor from './components/Editor'
import EditorTabs from './editor tabs/EditorTabs'
import { FabricContextProvider } from './contexts/fabric-context'
import FabricControls from './editor tabs/fabricControls'
import Canvas from './components/Canvas'
import TestCanvas from './components/testCanvas'
import { CanvasContextProvider } from './contexts/canvas-context'
import ControlsTabs from './editor tabs/ControlsTabs'

const Home = () => {
  const [color, setColor] = useState('#fffffe')
  const [designs, setDesigns] = useState<string[]>([
    '/cooldude.png',
    '/strawhat.png',
    'vercel.svg',
  ])

  // console.log(designs)

  return (
    <CanvasContextProvider>
      <FabricContextProvider>
        <div className="h-screen w-full relative bg-gray-500">
          {/* <div className=" top-2 absolute"> */}
          <TestCanvas />
          {/* </div> */}
          <Editor color={color} designs={designs} />
          <EditorTabs color={color} setColor={setColor}></EditorTabs>
          {/* <ControlsTabs designs={designs} setDesigns={setDesigns} /> */}
        </div>
      </FabricContextProvider>
    </CanvasContextProvider>
  )
}

export default Home
