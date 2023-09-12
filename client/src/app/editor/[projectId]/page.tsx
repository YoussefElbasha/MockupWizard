'use client'

import Editor from '../components/Editor'
import EditorTabs from '../editor tabs/EditorTabs'
import FabricCanvas from '../components/FabricCanvas'
import { CanvasContextProvider } from '../contexts/canvas-context'
import { useRef } from 'react'
import { Mesh } from 'three'

interface pageProps {
  params: {
    projectId: string
  }
}

const Home = ({ params }: pageProps) => {
  const screenShotRef = useRef<HTMLCanvasElement>(null)
  const meshRef = useRef<Mesh>(null)

  return (
    <CanvasContextProvider projectId={params.projectId}>
      <div className="relative w-full h-screen overflow-hidden bg-gray-500">
        <Editor ref={screenShotRef} meshRef={meshRef} />
        <EditorTabs
          ref={screenShotRef}
          projectId={params.projectId}
          meshRef={meshRef}
        />
        <FabricCanvas />
      </div>
    </CanvasContextProvider>
  )
}

export default Home
