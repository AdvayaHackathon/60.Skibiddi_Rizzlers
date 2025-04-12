"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/home/navbar"
import ReactMarkdown from 'react-markdown'

export default function CulturalConnectionPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    ethnicity: "",
    location: "",
  })
  const [loading, setLoading] = useState(false)
  const [connectionResult, setConnectionResult] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleEthnicityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, ethnicity: e.target.value })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, location: e.target.value })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleReset = () => {
    setFormData({
      ethnicity: "",
      location: ""
    })
    setConnectionResult("")
    setSubmitted(false)
    setStep(1)
    setError(null)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Get the access token from localStorage
      const token = localStorage.getItem('accessToken')
      
      const response = await fetch('http://localhost:8000/content/cultural-connection/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({
          ethnicity: formData.ethnicity.trim(),
          location: formData.location.trim()
        }),
      })

      if (!response.ok) {
        try {
          const errorData = await response.json()
          throw new Error(errorData.error || `Server error: ${response.status}`)
        } catch (parseError) {
          throw new Error(`Failed to get cultural connection (Status: ${response.status})`)
        }
      }

      const data = await response.json()
      setConnectionResult(data.connection)
      setSubmitted(true)
      
    } catch (error) {
      console.error('Error generating cultural connection:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',Helvetica]">
      <Navbar />
      <div className="h-24"></div>
      <div className="max-w-3xl mx-auto px-4 py-4">
        <Card className="p-6 border-none shadow-none">
          <h1 className="text-3xl font-bold text-center">Discover Your Cultural Connections</h1>
          <p className="text-center text-gray-600 mt-2">
            Explore the meaningful links between your cultural heritage and the places you visit
          </p>
          
          <Separator className="my-4" />
          
          {!submitted ? (
            <>
              <div className="mb-6 flex justify-center">
                <div className="flex items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-[#DD8256] text-white' : 'bg-gray-200'}`}>1</div>
                  <div className={`h-1 w-16 ${step > 1 ? 'bg-[#DD8256]' : 'bg-gray-200'}`}></div>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-[#DD8256] text-white' : 'bg-gray-200'}`}>2</div>
                </div>
              </div>

              {/* Step 1: Enter Ethnicity */}
              {step === 1 && (
                <div className="flex flex-col items-center">
                  <h2 className="mb-2 text-center text-xl font-semibold">What is your cultural background?</h2>
                  <p className="mb-6 text-center text-gray-600">
                    Share your ethnicity, cultural heritage, or ancestral background
                  </p>

                  <div className="relative mb-8 w-full max-w-md">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-gray-400"
                        >
                          <path d="M18 8a6 6 0 0 1-6 6c-3.31 0-6-2.69-6-6s2.69-6 6.2-6c3.31 0 6 2.69 5.8 6z" />
                          <path d="M18 8c0 4.5-1.79 8-6 8-3.31 0-6-2.69-6-6C6 6.69 8.69 4 12 4s6 2.69 6 4z" />
                        </svg>
                      </div>
                      <Input
                        type="text"
                        value={formData.ethnicity}
                        onChange={handleEthnicityChange}
                        placeholder="e.g., Indian, Nigerian, Irish American"
                        className="w-full pl-10 rounded-4xl"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={nextStep}
                    disabled={!formData.ethnicity.trim()}
                    className="w-[100px] rounded-4xl py-2 bg-[#DD8256] hover:bg-[#c27249] text-white"
                  >
                    Next
                  </Button>
                </div>
              )}

              {/* Step 2: Enter Destination */}
              {step === 2 && (
                <div className="flex flex-col items-center">
                  <h2 className="mb-2 text-center text-xl font-semibold">Where are you planning to visit?</h2>
                  <p className="mb-6 text-center text-gray-600">
                    Enter the destination you want to explore connections with
                  </p>

                  <div className="relative mb-8 w-full max-w-md">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-gray-400"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <Input
                        type="text"
                        value={formData.location}
                        onChange={handleLocationChange}
                        placeholder="e.g., Paris, Kyoto, Cape Town"
                        className="w-full pl-10 rounded-4xl"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 w-full max-w-md rounded-md bg-red-50 p-4 text-red-600">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="flex w-full max-w-md justify-between">
                    <Button 
                      onClick={prevStep} 
                      variant="outline" 
                      className="text-sm rounded-4xl font-medium text-gray-700"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={loading || !formData.location.trim()}
                      className="bg-[#DD8256] rounded-4xl hover:bg-[#c27249] text-white"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Discovering...
                        </span>
                      ) : 'Discover Connections'}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0b2727]">Cultural Connections</h2>
                <button
                  onClick={handleReset}
                  className="text-[#DD8256] hover:text-[#c27249] font-medium"
                >
                  Explore Another
                </button>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-xl p-4 shadow-sm">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[#DD8256] mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  <h3 className="font-semibold text-[#0b2727] text-lg">
                    {formData.ethnicity} Connections to {formData.location}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Based on historical research and cultural anthropology
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                {/* Replace the div with ReactMarkdown component */}
                <article className="prose max-w-none">
                  <ReactMarkdown>{connectionResult}</ReactMarkdown>
                </article>
              </div>

              <div className="bg-[#fef3f3] rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#0b2727] mb-2">Travel Tip</h3>
                <p className="text-gray-700">
                  Understanding historical and cultural connections can enrich your travel experience. 
                  Consider exploring local museums, heritage sites, or connecting with community centers 
                  related to these shared cultural elements.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}