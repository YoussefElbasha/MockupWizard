import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { CloseOutline } from 'react-ionicons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/Hover'

interface TabButtonProps {
  index: number
  isVisible: number
  onClick(): void
  tabButtonIcon: React.ReactNode
}

const TabButton = ({
  index,
  isVisible,
  onClick,
  tabButtonIcon,
}: TabButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip
        open={isOpen}
        onOpenChange={(open) => {
          if (isVisible) setIsOpen(false)
          else setIsOpen(open)
        }}>
        <TooltipTrigger asChild>
          <button
            className="bg-white p-2 rounded-full w-[3.5em] h-[3.5em] drop-shadow-lg"
            onClick={onClick}>
            <AnimatePresence mode="wait" initial={false}>
              {isVisible === index ? (
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
                  key={'close-icon'}>
                  <div className="hover:scale-[1.1] transition-all ease-in-out duration-300">
                    <CloseOutline
                      style={{ fill: 'black', height: '2.5em', width: '2.5em' }}
                    />
                  </div>
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
                  key={'color-picker-palette-icon'}>
                  {tabButtonIcon}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={-45}
          alignOffset={75}
          align="start"
          avoidCollisions={false}>
          <p>Model Color Picker</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TabButton
