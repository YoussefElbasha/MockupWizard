'use client'

import { useState } from 'react'
import Editor from './components/Editor'
import EditorTabs from './editor tabs/EditorTabs'

const Home = () => {
  const [color, setColor] = useState('#fff')

  return (
    <div className="h-screen w-full relative bg-gray-500">
      <Editor color={color}></Editor>
      <EditorTabs color={color} setColor={setColor}></EditorTabs>
    </div>
  )
}

export default Home
