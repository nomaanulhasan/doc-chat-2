"use client"

import { FileText, FileSearch, HelpCircle, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LeftSidebar({ onHelpClick, onSettingsClick }) {
  return (
    <div className="w-64 bg-card text-card-foreground border-r flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">DocAI</h1>
      </div>
      <nav className="flex-1 p-4">
        <Button variant="ghost" className="w-full justify-start mb-3 hover:bg-accent hover:text-accent-foreground text-lg">
          <FileText className="mr-3 h-5 w-5" />
          Drafting of Documents
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-3 hover:bg-accent hover:text-accent-foreground text-lg">
          <FileSearch className="mr-3 h-5 w-5" />
          Case Summarization
        </Button>
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start mt-3 hover:bg-accent hover:text-accent-foreground" onClick={onHelpClick}>
          <HelpCircle className="mr-2 h-4 w-4" />
          Help
        </Button>
        <Button variant="ghost" className="w-full justify-start mt-2 hover:bg-accent hover:text-accent-foreground" onClick={onSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start mt-2 text-destructive hover:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}