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
      <Navbar />
      
      <div className="w-full max-w-3xl mt-8 md:mt-16">
        <div className="text-center mb-8">
          <svg width="129" height="35" viewBox="0 0 129 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
            <path d="M51.516 16.084C51.516 16.78 51.276 17.36 50.796 17.824C50.324 18.28 49.6 18.508 48.624 18.508H47.016V22H45.924V13.636H48.624C49.568 13.636 50.284 13.864 50.772 14.32C51.268 14.776 51.516 15.364 51.516 16.084ZM48.624 17.608C49.232 17.608 49.68 17.476 49.968 17.212C50.256 16.948 50.4 16.572 50.4 16.084C50.4 15.052 49.808 14.536 48.624 14.536H47.016V17.608H48.624ZM55.7412 22.108C55.1252 22.108 54.5652 21.968 54.0612 21.688C53.5652 21.408 53.1732 21.012 52.8852 20.5C52.6052 19.98 52.4652 19.38 52.4652 18.7C52.4652 18.028 52.6092 17.436 52.8972 16.924C53.1932 16.404 53.5932 16.008 54.0972 15.736C54.6012 15.456 55.1652 15.316 55.7892 15.316C56.4132 15.316 56.9772 15.456 57.4812 15.736C57.9852 16.008 58.3812 16.4 58.6692 16.912C58.9652 17.424 59.1132 18.02 59.1132 18.7C59.1132 19.38 58.9612 19.98 58.6572 20.5C58.3612 21.012 57.9572 21.408 57.4452 21.688C56.9332 21.968 56.3652 22.108 55.7412 22.108ZM55.7412 21.148C56.1332 21.148 56.5012 21.056 56.8452 20.872C57.1892 20.688 57.4652 20.412 57.6732 20.044C57.8892 19.676 57.9972 19.228 57.9972 18.7C57.9972 18.172 57.8932 17.724 57.6852 17.356C57.4772 16.988 57.2052 16.716 56.8692 16.54C56.5332 16.356 56.1692 16.264 55.7772 16.264C55.3772 16.264 55.0092 16.356 54.6732 16.54C54.3452 16.716 54.0812 16.988 53.8812 17.356C53.6812 17.724 53.5812 18.172 53.5812 18.7C53.5812 19.236 53.6772 19.688 53.8692 20.056C54.0692 20.424 54.3332 20.7 54.6612 20.884C54.9892 21.06 55.3492 21.148 55.7412 21.148Z" fill="#333333" />
            <rect width="36" height="35" rx="17.5" fill="#FEC4C4" />
            <path fillRule="evenodd" clipRule="evenodd" d="M16.5739 10.3292C15.8003 10.0545 15.0978 9.62191 14.5147 9.06124C13.9316 8.50056 13.4817 7.82507 13.1961 7.08125C13.0791 6.775 12.6176 6.775 12.5006 7.08125C12.2171 7.8258 11.7684 8.50205 11.1857 9.06295C10.6029 9.62385 9.90003 10.0559 9.12597 10.3292C8.80747 10.4417 8.80747 10.8854 9.12597 10.9979C9.89954 11.2726 10.6021 11.7052 11.1852 12.2658C11.7683 12.8265 12.2181 13.502 12.5038 14.2458C12.6208 14.5521 13.0823 14.5521 13.1993 14.2458C13.485 13.502 13.9348 12.8265 14.518 12.2658C15.1011 11.7052 15.8036 11.2726 16.5771 10.9979C16.8956 10.8854 16.8956 10.4417 16.5771 10.3292H16.5739ZM18.4535 9.89375C18.239 9.89375 18.0333 9.97568 17.8816 10.1215C17.73 10.2673 17.6448 10.4651 17.6448 10.6714C17.6448 10.8776 17.73 11.0754 17.8816 11.2212C18.0333 11.367 18.239 11.449 18.4535 11.449C21.7641 11.449 24.4421 14.001 24.4421 17.075C24.4421 18.6885 23.569 20.4625 22.2213 22.2333C21.0351 23.7906 19.617 25.1792 18.4643 26.2771C17.3051 25.1792 15.8654 23.776 14.6694 22.2042C13.3326 20.4438 12.467 18.6812 12.467 17.075C12.467 16.8688 12.3818 16.671 12.2301 16.5252C12.0784 16.3793 11.8727 16.2974 11.6583 16.2974C11.4438 16.2974 11.2381 16.3793 11.0864 16.5252C10.9348 16.671 10.8496 16.8688 10.8496 17.075C10.8496 19.1781 11.9589 21.2719 13.3629 23.1208C14.7701 24.9687 16.4742 26.5792 17.6746 27.7115L17.7179 27.7531L17.8912 27.9198C18.041 28.0647 18.2442 28.147 18.4567 28.149C18.6692 28.1509 18.8739 28.0723 19.0266 27.9302L19.1891 27.7781L19.2107 27.7573L19.2681 27.699L19.2714 27.6969C20.4652 26.5615 22.1368 24.975 23.5256 23.1531C24.9405 21.2937 26.0596 19.1865 26.0596 17.075C26.0596 13.1135 22.6276 9.89375 18.4535 9.89375ZM17.3485 15.3562C17.681 15.2235 18.0546 15.2219 18.3884 15.3517C18.7222 15.4815 18.9896 15.7323 19.1327 16.05C19.1994 16.2056 19.2333 16.3724 19.2325 16.5407C19.2316 16.709 19.196 16.8755 19.1276 17.0305C19.0593 17.1854 18.9596 17.3258 18.8344 17.4434C18.7092 17.561 18.5609 17.6536 18.3982 17.7156C18.0656 17.8484 17.6921 17.85 17.3583 17.7202C17.0245 17.5904 16.7571 17.3396 16.614 17.0219C16.5471 16.8661 16.5131 16.6992 16.514 16.5307C16.5149 16.3622 16.5506 16.1956 16.619 16.0405C16.6874 15.8854 16.7873 15.745 16.9127 15.6273C17.0381 15.5097 17.1866 15.4172 17.3496 15.3552" fill="#EE6E6E" />
          </svg>
          
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
            
            <div className="space-y-2">
              <label htmlFor="location" className="block text-[#0b2727] font-medium">
                Enter a location to discover its folk lore
              </label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Rajasthan, Varanasi, Mysore Palace"
                className="w-full p-4 rounded-xl border border-[#6e7074] border-opacity-30 focus:border-[#dd8256] focus:ring-[#dd8256]"
                disabled={isLoading}
              />
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