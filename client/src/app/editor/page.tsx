'use client'

import Editor from './components/Editor'
import EditorTabs from './editor tabs/EditorTabs'
import TestCanvas from './components/testCanvas'
import { CanvasContextProvider } from './contexts/canvas-context'
import { useRef } from 'react'

const Home = () => {
  const screenShotRef = useRef<HTMLCanvasElement>(null)

  return (
    <CanvasContextProvider>
      <div className="h-screen w-full relative bg-gray-500 overflow-hidden">
        <Editor ref={screenShotRef} />
        <EditorTabs ref={screenShotRef} />
        <TestCanvas />
      </div>
    </CanvasContextProvider>
  )
}

export default Home
