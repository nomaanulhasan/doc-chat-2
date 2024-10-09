"use client"

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ModeToggle } from './ModeToggle'
import { History, Download } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header({ fileName, onFileNameChange, onDownload, onClearVisionToggle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempFileName, setTempFileName] = useState(fileName)
  const [clearVision, setClearVision] = useState(false)

  useEffect(() => {
    setTempFileName(fileName)
  }, [fileName])

  const handleFileNameChange = () => {
    setIsEditing(false)
    onFileNameChange(tempFileName)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFileNameChange()
    }
  }

  const handleClearVisionToggle = (checked) => {
    setClearVision(checked)
    onClearVisionToggle(checked)
  }

  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        {isEditing ? (
          <Input
            value={tempFileName}
            onChange={(e) => setTempFileName(e.target.value)}
            onBlur={handleFileNameChange}
            onKeyDown={handleKeyDown}
            className="text-2xl font-bold bg-transparent border-none focus:outline-none focus:ring-0"
            autoFocus
          />
        ) : (
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setIsEditing(true)}>
            {fileName}
          </h1>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <History className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              Last edited 5 minutes ago
            </DropdownMenuItem>
            <DropdownMenuItem>
              Version history
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Clear Vision</span>
          <Switch
            checked={clearVision}
            onCheckedChange={handleClearVisionToggle}
          />
        </div>
        <Button variant="ghost" size="icon" onClick={onDownload}>
          <Download className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}