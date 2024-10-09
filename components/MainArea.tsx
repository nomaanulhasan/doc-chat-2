"use client"

import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { renderAsync } from 'docx-preview'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

const MainArea = forwardRef((props, ref) => {
  const [content, setContent] = useState('')
  const [isWordDocument, setIsWordDocument] = useState(false)
  const containerRef = useRef(null)
  const fileInputRef = useRef(null)
  const editorRef = useRef(null)

  useImperativeHandle(ref, () => ({
    downloadDocument: () => {
      if (isWordDocument) {
        // Implement Word document download logic here
        console.log('Downloading Word document')
      } else {
        const content = editorRef.current.getContent()
        const blob = new Blob([content], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'document.html'
        a.click()
        URL.revokeObjectURL(url)
      }
    }
  }))

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file && file.name.endsWith('.docx')) {
      setIsWordDocument(true)
      const arrayBuffer = await file.arrayBuffer()
      renderAsync(arrayBuffer, containerRef.current)
    } else {
      setIsWordDocument(false)
      // Handle other file types or show an error message
    }
  }

  const handleEditorChange = (newContent, editor) => {
    setContent(newContent)
  }

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="mb-4">
        <Button onClick={() => fileInputRef.current.click()} className="mr-2">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".docx"
          className="hidden"
        />
      </div>
      {isWordDocument ? (
        <div ref={containerRef} className="border rounded-lg p-4 min-h-[600px]"></div>
      ) : (
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          apiKey="your-tinymce-api-key"
          init={{
            height: 600,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          value={content}
          onEditorChange={handleEditorChange}
        />
      )}
    </div>
  )
})

MainArea.displayName = 'MainArea'

export default MainArea