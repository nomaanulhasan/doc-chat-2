"use client"

import { useState, useRef } from 'react'
import LeftSidebar from './LeftSidebar'
import MainArea from './MainArea'
import RightSidebar from './RightSidebar'
import HelpDialog from './HelpDialog'
import SettingsMenu from './SettingsMenu'
import Header from './Header'

export default function DocumentEditor() {
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [fileName, setFileName] = useState('Untitled Document')
  const [clearVision, setClearVision] = useState(false)
  const mainAreaRef = useRef(null)

  const handleDownload = () => {
    if (mainAreaRef.current) {
      mainAreaRef.current.downloadDocument()
    }
  }

  const handleClearVisionToggle = (checked) => {
    setClearVision(checked)
  }

  return (
    <div className="flex h-screen bg-background">
      {!clearVision && (
        <LeftSidebar 
          onHelpClick={() => setShowHelpDialog(true)}
          onSettingsClick={() => setShowSettingsMenu(true)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <Header 
          fileName={fileName} 
          onFileNameChange={setFileName} 
          onDownload={handleDownload}
          onClearVisionToggle={handleClearVisionToggle}
        />
        <div className="flex-1 flex overflow-hidden">
          <MainArea ref={mainAreaRef} />
          {!clearVision && <RightSidebar />}
        </div>
      </div>
      <HelpDialog open={showHelpDialog} onOpenChange={setShowHelpDialog} />
      <SettingsMenu open={showSettingsMenu} onOpenChange={setShowSettingsMenu} />
    </div>
  )
}