'use client'

import React, { useState } from 'react'
import { CloseOutline, ColorPalette } from 'react-ionicons'
import { Colorful } from '@uiw/react-color'
import { AnimatePresence, motion } from 'framer-motion'
import TabButton from './TabButton'

interface EditorProps {
  color: string
  setColor(color: string): void
}

const EditorTabs = ({ color, setColor }: EditorProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const [hexInput, setHexInput] = useState(color)

  const onHexChange = (input: string) => {
    const splitInput = input.split('#')
    if (splitInput[splitInput.length - 1].length > 6) return

    console.log(input)
    if (input === '#' || input === '') {
      setHexInput('#')
    }

    const inputRegex = /^[0-9a-fA-F]+$/

    if (inputRegex.test(splitInput[splitInput.length - 1])) {
      setHexInput('#' + splitInput[splitInput.length - 1])
    }

    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g

    if (regex.test('#' + splitInput[splitInput.length - 1])) {
      setColor('#' + splitInput[splitInput.length - 1])
    }
  }

  return (
    <div className="flex-col absolute top-[50%] left-6">
      <div className="relative">
        <TabButton
          isVisible={activeTab}
          onClick={() => (activeTab === 0 ? setActiveTab(1) : setActiveTab(0))}
          tabButtonIcon={
            <ColorPalette color={'white'} height="2.5em" width="2.5em" />
          }
        />
        <AnimatePresence mode="wait">
          {activeTab === 1 && (
            <motion.div
              key="color picker"
              initial={{ opacity: 0, x: -6, y: '-50%' }}
              animate={{
                opacity: 1,
                x: 20,
              }}
              exit={{ x: 4, opacity: 0 }}
              transition={{
                duration: 0.2,
              }}
              className="absolute top-[50%] left-full"
            >
              <Colorful
                disableAlpha
                color={color}
                onChange={(color) => {
                  setHexInput(color.hex)
                  setColor(color.hex)
                }}
              />
              <input
                title="hex input"
                value={hexInput}
                onChange={(e) => onHexChange(e.target.value)}
                onClick={(e) => e.currentTarget.select()}
                className="w-[200px] mt-2 text-left bg-black border-2 border-black rounded-md"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EditorTabs
