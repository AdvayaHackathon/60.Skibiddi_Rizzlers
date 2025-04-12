"use client"

import { useState, useRef, useEffect } from "react"
import Navbar from "@/components/home/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function FolkLorePage() {
  const [location, setLocation] = useState("")
  const [folkLore, setFolkLore] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [generateAudio, setGenerateAudio] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Control audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])
  
  // Handle audio events
  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleAudioError = () => {
    setError("Failed to load audio. Please try again.")
    setAudioUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!location.trim()) {
      setError("Please enter a location")
      return
    }

    setIsLoading(true)
    setError(null)
    setAudioUrl(null)
    
    try {
      // Call the folklore endpoint with audio generation option
      const response = await fetch("http://localhost:8000/content/folklore/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          location: location.trim(),
          generate_audio: generateAudio
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate folk lore")
      }

      const data = await response.json()
      setFolkLore(data.folk_lore)
      
      // Set audio URL if available
      if (data.audio_url) {
        setAudioUrl(data.audio_url)
      } else if (data.story_id && generateAudio) {
        // If we have a story ID but no direct URL, use the story ID to construct the URL
        setAudioUrl(`http://localhost:8000/content/folklore/audio/${data.story_id}/`)
      }
      
      // If there was an audio error from the backend
      if (data.audio_error && generateAudio) {
        console.warn("Audio generation error:", data.audio_error)
        setError(`Folk lore was generated successfully, but audio narration failed: ${data.audio_error}`)
      }
      
      setSubmitted(true)
    } catch (err) {
      console.error("Error generating folk lore:", err)
      setError(err instanceof Error ? err.message : "An error occurred while generating folk lore")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setLocation("")
    setFolkLore("")
    setSubmitted(false)
    setError(null)
    setAudioUrl(null)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center opacity-10 z-[-1]"
        aria-hidden="true"
      ></div>

      <Navbar />

      <div className="w-full font-['Plus_Jakarta_Sans',Helvetica]  max-w-3xl mt-8 md:mt-16">
        <div className="text-center m-8">


          <h1 className="text-3xl md:text-4xl font-bold text-[#0b2727] mb-2">TRADITIONAL FOLK LORE</h1>
          <p className="text-[#6e7074]">Discover amazing folk tales from around the world</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <div className="space-y-4 flex flex-col items-center justify-center">
              <label
                htmlFor="location"
                className="block justify-center text-center text-[#0b2727] mt-4 font-medium text-lg"
              >
                Enter a location to discover its folk lore
              </label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Rajasthan, Varanasi, Mysore Palace"
                className="w-full md:w-3/4 lg:w-2/3 p-4 rounded-full border bg-white border-[#6e7074] border-opacity-30 focus:border-[#dd8256] focus:ring-[#dd8256] shadow-md text-gray-700 placeholder-gray-400"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full md:w-3/4 lg:w-2/3 bg-gradient-to-r from-[#dd8256] to-[#c27249] hover:from-[#c27249] hover:to-[#a85b3b] text-white font-medium rounded-full p-4 h-auto shadow-lg transform transition-transform duration-300 hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Folk Lore...
                  </span>
                ) : (
                  "Discover Folk Lore"
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="audio-mode"
                checked={generateAudio}
                onCheckedChange={setGenerateAudio}
                disabled={isLoading}
              />
              <Label htmlFor="audio-mode" className="text-[#0b2727]">
                Generate audio narration
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#dd8256] hover:bg-[#c27249] text-white font-medium rounded-xl p-4 h-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {generateAudio ? "Generating Folk Lore & Audio..." : "Generating Folk Lore..."}
                </span>
              ) : (
                "Discover Folk Lore"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#0b2727]">Folk Lore of {location}</h2>
              <button
                onClick={handleReset}
                className="text-[#dd8256] hover:text-[#c27249] font-medium"
              >
                Generate Another
              </button>
            </div>
            
            {/* Audio Player */}
            {audioUrl && (
              <div className="bg-[#f8f9fa] rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-[#0b2727]">Audio Narration</h3>
                  <Button
                    onClick={toggleAudio}
                    variant="outline"
                    className="border-[#dd8256] text-[#dd8256] hover:bg-[#fef3f3]"
                  >
                    {isPlaying ? (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                        Pause
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Listen
                      </span>
                    )}
                  </Button>
                </div>
                
                <audio 
                  ref={audioRef}
                  src={audioUrl}
                  className="hidden"
                  onEnded={handleAudioEnded}
                  onError={handleAudioError}
                />
                
                <p className="text-xs text-gray-500 mt-2">
                  You can listen to the tale being narrated or read it below.
                </p>
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <div className="uppercase tracking-wide text-sm text-[#dd8256] font-semibold">
                Traditional Tale
              </div>

              <div className="mt-4 whitespace-pre-line text-gray-700 prose max-w-none">
                {folkLore}
              </div>
            </div>

            <div className="bg-[#fef3f3] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#0b2727] mb-2">Did you know?</h3>
              <p className="text-gray-700">
                Folk tales are stories passed down through generations by word of mouth.
                They often reflect the values, beliefs, and cultural identity of a community.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}