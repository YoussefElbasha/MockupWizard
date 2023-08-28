'use client'

import React, { useState } from 'react'
import { ColorPalette, Images } from 'react-ionicons'
import TabButton from './TabButton'
import ColorPicker from './ColorPicker'
import FileUpload from './FileUpload'
import Controls from './Controls'
import FabricControls from './fabricControls'

type ControlsTabsProps = {
  designs: string[]
  setDesigns: React.Dispatch<React.SetStateAction<string[]>>
}

const ControlsTabs = ({ designs, setDesigns }: ControlsTabsProps) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="flex flex-col absolute top-[0%] right-6 gap-3">
      {designs.map((design, index) => (
        <div className="relative" key={index}>
          <FabricControls index={index} setDesigns={setDesigns} />
          {/* <TabButton
            // make isVisible a boolean
            index={index}
            isVisible={activeTab}
            onClick={() =>
              activeTab !== index + 1
                ? setActiveTab(index + 1)
                : setActiveTab(0)
            }
            tabButtonIcon={
              <div className="translate-x-[-0.11em] hover:scale-[1.1] transition-all ease-in-out duration-300">
                <ColorPalette
                  style={{ fill: 'black', height: '2.5em', width: '2.5em' }}
                />
              </div>
            }
          /> */}
        </div>
      ))}
    </div>
  )
}

export default ControlsTabs
