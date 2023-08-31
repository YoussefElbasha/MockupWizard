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
  return (
    <CanvasContextProvider>
      <FabricContextProvider>
        <div className="h-screen w-full relative bg-gray-500 overflow-hidden">
          <Editor />
          <EditorTabs />
          <div className="">
            <TestCanvas />
          </div>
        </div>
      </FabricContextProvider>
    </CanvasContextProvider>
  )
}

export default Home
