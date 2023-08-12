import React from 'react'

const EditorTabs = () => {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div className="flex-col absolute bg-slate-500 top-[50%]">
      <div onClick={handleClick}>color picker</div>
    </div>
  )
}

export default EditorTabs
