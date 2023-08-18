'use client'

import React, { useState } from 'react'
import { ColorPalette, Images } from 'react-ionicons'
import TabButton from './TabButton'
import ColorPicker from './ColorPicker'
import FileUpload from './FileUpload'

interface EditorProps {
  color: string
  setColor(color: string): void
}

const EditorTabs = ({ color, setColor }: EditorProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const [hexInput, setHexInput] = useState(color)

  return (
    <div className="flex flex-col absolute top-[50%] left-6 gap-3">
      <div className="relative">
        <TabButton
          // make isVisible a boolean
          index={1}
          isVisible={activeTab}
          onClick={() => (activeTab !== 1 ? setActiveTab(1) : setActiveTab(0))}
          tabButtonIcon={
            <div className="translate-x-[-0.11em] hover:scale-[1.1] transition-all ease-in-out duration-300">
              <ColorPalette
                style={{ fill: 'black', height: '2.5em', width: '2.5em' }}
              />
            </div>
          }
        />
        {/* when opening color picker and value is #fff cant move bottom color slider!! fix */}
        <ColorPicker
          index={1}
          isVisible={activeTab}
          color={color}
          setColor={setColor}
          hexInput={hexInput}
          setHexInput={setHexInput}
        />
      </div>
      <div className="relative">
        <FileUpload
          onClick={() => (activeTab !== 2 ? setActiveTab(2) : setActiveTab(0))}
        />
      </div>
    </div>
  )
}

export default EditorTabs
