'use client'

import React, { useState } from 'react'
import {
  ChevronBack,
  ChevronBackCircle,
  ColorPalette,
  Images,
  Rocket,
} from 'react-ionicons'
import TabButton from './TabButton'
import ColorPicker from './ColorPicker'
import FileUpload from './FileUpload'
import { useCanvasContext } from '../contexts/canvas-context'
import ModelPicker from './ModelPicker'
// import Screenshot from './Screenshot'
import { forwardRef } from 'react'
import SaveButton from './SaveButton'
import DownloadModelButton from './DownloadModelButton'
import Dalle from './dalle/Dalle'
import Link from 'next/link'

interface EditorTabsProps {
  meshRef: React.MutableRefObject<any>
  projectId: string
}

const EditorTabs = forwardRef<HTMLCanvasElement, EditorTabsProps>(
  (props, ref) => {
    const [activeTab, setActiveTab] = useState(0)
    const { color, setColor } = useCanvasContext()
    const [hexInput, setHexInput] = useState(color)

    return (
      <>
        <Link
          href="/dashboard"
          className="absolute w-10 h-10 p-2 transition-all duration-300 ease-in-out bg-white rounded-full top-6 left-6 hover:bg-neutral-200/60"
        >
          <ChevronBack cssClasses="!w-full !h-full" />
        </Link>
        <div className="absolute z-10 flex flex-col gap-3 -translate-y-1/2 top-1/2 left-6">
          <div className="relative">
            <TabButton
              // make isVisible a boolean
              index={1}
              isVisible={activeTab}
              onClick={() =>
                activeTab !== 1 ? setActiveTab(1) : setActiveTab(0)
              }
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
              onClick={() =>
                activeTab !== 2 ? setActiveTab(2) : setActiveTab(0)
              }
            />
          </div>
          <div className="relative">
            <Dalle />
          </div>
          <div className="relative">
            <ModelPicker
              button={
                <button
                  className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
                  onClick={() =>
                    activeTab !== 3 ? setActiveTab(3) : setActiveTab(0)
                  }
                >
                  <p className="sr-only">Model Picker</p>
                  <div className="translate-x-[0.20em] hover:scale-[1.1] transition-all ease-in-out duration-300">
                    <Rocket
                      style={{ fill: 'black', height: '2em', width: '2em' }}
                    />
                  </div>
                </button>
              }
            />
          </div>
          {/* <div className="relative">
        <Screenshot
          ref={ref}
          onClick={() => (activeTab !== 3 ? setActiveTab(3) : setActiveTab(0))}
        />
      </div> */}
          <div className="relative">
            <DownloadModelButton ref={props.meshRef} />
          </div>
          <div className="relative">
            <SaveButton projectId={props.projectId} meshRef={props.meshRef} />
          </div>
        </div>
      </>
    )
  }
)

EditorTabs.displayName = 'EditorTabs'

export default EditorTabs
