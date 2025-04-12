"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/home/navbar"
import { Upload, X, Camera, Info, BookOpen } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export default function MonumentDetectionPage() {
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    
    if (files && files.length > 0) {
      const selectedFile = files[0]
      
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file (JPEG, PNG, etc.)')
        return
      }
      
      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      
      setImage(selectedFile)
      setError(null)
      
      // Create preview URL
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(objectUrl)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      
      // Check if file is an image
      if (!droppedFile.type.startsWith('image/')) {
        setError('Please select an image file (JPEG, PNG, etc.)')
        return
      }
      
      // Check file size (limit to 5MB)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      
      setImage(droppedFile)
      setError(null)
      
      // Create preview URL
      const objectUrl = URL.createObjectURL(droppedFile)
      setPreviewUrl(objectUrl)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const clearImage = () => {
    setImage(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    if (!image) {
      setError('Please select an image first')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      // Get token from local storage
      const token = localStorage.getItem('accessToken')
      
      // Create FormData object to send the file
      const formData = new FormData()
      formData.append('image', image)
      
      // Call the API endpoint
      const response = await fetch('http://localhost:8000/content/identify-image/', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData
      })
      
      if (!response.ok) {
        let errorMessage = 'Failed to identify image'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If can't parse error JSON, use default message
        }
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      setResult(data.content)
      setUploadedImage(previewUrl)
      
    } catch (err) {
      console.error('Error identifying image:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while processing the image')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    clearImage()
    setResult(null)
    setUploadedImage(null)
  }

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',Helvetica]">
      <Navbar />
      <div className="h-24"></div>
      <div className="max-w-3xl mx-auto px-4 py-4">
        <Card className="p-6 border-none shadow-none">
          <h1 className="text-3xl font-bold text-center">Monument Recognition</h1>
          <p className="text-center text-gray-600 mt-2">
            Upload a photo of a landmark or monument to learn about its history and cultural significance
          </p>
          
          <Separator className="my-4" />
          
          {!result ? (
            <div className="space-y-6">
              {/* Upload area */}
              <div 
                className={`relative border-2 border-dashed rounded-xl p-8 transition-colors text-center 
                  ${previewUrl ? "border-[#DD8256]" : "border-gray-300 hover:border-gray-400"}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {previewUrl ? (
                  <div className="relative">
                    <div className="relative w-full aspect-video mx-auto overflow-hidden rounded-lg">
                      <Image 
                        src={previewUrl} 
                        alt="Selected image preview" 
                        fill
                        className="object-cover" 
                      />
                    </div>
                    <button 
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X size={18} className="text-gray-700" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4" onClick={triggerFileInput}>
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#fef3f3] flex items-center justify-center">
                      <Upload className="h-6 w-6 text-[#DD8256]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">
                        Drag and drop an image, or <span className="text-[#DD8256]">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports JPG, PNG, JPEG (max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="flex justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={!image || loading}
                  className="bg-[#DD8256] hover:bg-[#c27249] text-white font-medium px-6 py-2 rounded-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Image...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Discover Monument History
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="bg-[#fef3f3] rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-[#DD8256] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">Tips for best results</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1 list-disc list-inside">
                      <li>Upload clear, well-lit images of monuments or landmarks</li>
                      <li>Try to capture the entire structure if possible</li>
                      <li>Avoid images with heavy filters or edits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0b2727]">Monument Information</h2>
                <button
                  onClick={resetForm}
                  className="text-[#DD8256] hover:text-[#c27249] font-medium"
                >
                  Analyze Another
                </button>
              </div>
              
              {uploadedImage && (
                <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-md">
                  <Image 
                    src={uploadedImage} 
                    alt="Analyzed monument" 
                    fill
                    className="object-cover" 
                  />
                </div>
              )}
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                <div className="uppercase tracking-wide text-sm text-[#DD8256] font-semibold mb-2">
                  Historical Background
                </div>
                
                <div className="mt-4 prose prose-headings:text-[#0b2727] prose-a:text-[#DD8256] prose-strong:text-gray-800 max-w-none">
                  <ReactMarkdown>{result || ''}</ReactMarkdown>
                </div>
              </div>
              
              <div className="bg-[#fef3f3] rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#0b2727] mb-2">Did you know?</h3>
                <p className="text-gray-700">
                  Preserving cultural heritage sites is crucial for maintaining our collective history. 
                  By learning about these monuments, you contribute to their conservation through awareness.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}