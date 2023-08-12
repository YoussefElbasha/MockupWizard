'use client'

import { useState } from 'react'
import Editor from '../components/Editor'
import { Sketch } from '@uiw/react-color'
import EditorTabs from '../components/EditorTabs'

const Home = () => {
  const [color, setColor] = useState('#fff')

  return (
    <div className="h-screen w-full relative bg-white">
      <Editor color={color}></Editor>
      {/* <Sketch
          className="absolute top-0 left-0"
          style={{ marginLeft: 20 }}
          color={color}
          onChange={(color) => {
            setColor(color.hex)
          }}
        /> */}
      <EditorTabs />
    </div>
  )
}

export default Home
