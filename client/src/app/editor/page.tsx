'use client'

import Editor from './components/Editor'
import EditorTabs from './editor tabs/EditorTabs'
import TestCanvas from './components/testCanvas'
import { CanvasContextProvider } from './contexts/canvas-context'

const Home = () => {
  return (
    <CanvasContextProvider>
      <div className="h-screen w-full relative bg-gray-500 overflow-hidden">
        <Editor />
        <EditorTabs />
        <TestCanvas />
      </div>
    </CanvasContextProvider>
  )
}

export default Home
