import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { CloseOutline, ColorPalette } from 'react-ionicons'

interface TabButtonProps {
  isVisible: number
  onClick(): void
  tabButtonIcon: React.ReactNode
}

const TabButton = ({ isVisible, onClick, tabButtonIcon }: TabButtonProps) => {
  return (
    <button
      className="bg-red-400 p-2 rounded-full w-[3.5em] h-[3.5em]"
      title={'color picker menu button'}
      onClick={onClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isVisible === 1 ? (
          <motion.div
            initial={{ scale: 0, rotate: 90 }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{
              duration: 0.1,
            }}
            key={'close-icon'}
          >
            <CloseOutline color={'white'} height="2.5em" width="2.5em" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: 90 }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{
              duration: 0.1,
            }}
            key={'color-picker-palette-icon'}
          >
            <div className="translate-x-[-0.11em]">{tabButtonIcon}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default TabButton
