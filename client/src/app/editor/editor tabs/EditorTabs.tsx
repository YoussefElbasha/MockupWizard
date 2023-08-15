'use client'

import React, { useState } from 'react'
import { ColorPalette } from 'react-ionicons'
import TabButton from './TabButton'
import ColorPicker from './ColorPicker'

interface EditorProps {
  color: string
  setColor(color: string): void
}

const EditorTabs = ({ color, setColor }: EditorProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const [hexInput, setHexInput] = useState(color)

  return (
    <div className="flex-col absolute top-[50%] left-6">
      <div className="relative">
        <TabButton
          isVisible={activeTab}
          onClick={() => (activeTab === 0 ? setActiveTab(1) : setActiveTab(0))}
          tabButtonIcon={
            <ColorPalette
              style={{ fill: 'white' }}
              color={'white'}
              height="2.5em"
              width="2.5em"
            />
          }
        />
        <ColorPicker
          isVisible={activeTab}
          color={color}
          setColor={setColor}
          hexInput={hexInput}
          setHexInput={setHexInput}
        />
      </div>
    </div>
  )
}

export default EditorTabs
