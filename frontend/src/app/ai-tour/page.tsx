"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/home/navbar"


// Sample interests data
const interestCategories = [
  "Must-see Attractions",
  "Great Food",
  "Hidden Gems",
  "Tours & Experiences",
  "Architecture",
  "Spiritual Tourism",
  "Beach Relaxation",
  "Local Cuisine",
  "Yoga and Wellness",
  "Art and Craft",
  "Adventure and Sports",
  "Arts & Theatre",
]

export default function TravelItineraryPlanner() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    location: "",
    days: 3,
    preferences: "",
    interests: [] as string[],
  })
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [customInterest, setCustomInterest] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle destination input and suggestions
  useEffect(() => {
    if (formData.location.length > 0) {
  
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [formData.location])

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, location: e.target.value })
  }

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, location: suggestion })
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Handle days input
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= 14) {
      setFormData({ ...formData, days: value })
    }
  }

  // Handle preferences input
  const handlePreferencesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, preferences: e.target.value })
  }

  // Handle interest selection
  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest)
      })
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      })
    }
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !formData.interests.includes(customInterest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, customInterest]
      })
      setCustomInterest("")
      setShowCustomInput(false)
    }
  }

  // Prepare combined preferences string for submission
  const prepareFinalPreferences = () => {
    // Start with the existing preferences text
    let finalPreferences = formData.preferences.trim();
    
    // Add interests if any are selected
    if (formData.interests.length > 0) {
      // If there's already text in preferences, add a separator
      if (finalPreferences) {
        finalPreferences += "\n\nInterests: ";
      } else {
        finalPreferences = "Interests: ";
      }
      finalPreferences += formData.interests.join(', ');
    }
    
    return finalPreferences;
  }

  // Navigation handlers
  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  // Form submission
  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // Get the access token from localStorage
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        throw new Error('Authentication required. Please log in again.');
      }
      
      const response = await fetch('http://localhost:8000/content/itinerary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location: formData.location,
          days: formData.days,
          preferences: prepareFinalPreferences()
        }),
      })

      // Check for different error cases
      if (!response.ok) {
        // Try to get error details from the response
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || `Server error: ${response.status}`);
        } catch (parseError) {
          // If we can't parse the error JSON, use the status code
          throw new Error(`Failed to generate itinerary (Status: ${response.status})`);
        }
      }

      const data = await response.json();
      
      // Log success to help with debugging
      console.log("Itinerary generated successfully:", data.id);
      
      // Store the itinerary data in localStorage for the next page
      localStorage.setItem('itineraryData', JSON.stringify(data));
      
      // Redirect to the itinerary page
      router.push('/ai-tour/itinerary');
    } catch (error) {
      console.error('Error generating itinerary:', error);
      
      // Show a more user-friendly error message
      let errorMessage = 'Failed to generate itinerary. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Authentication required')) {
          errorMessage = 'Your session has expired. Please log in again.';
          // Optionally redirect to login page
          // router.push('/login');
        } else {
          errorMessage = error.message;
        }
      }
      
      // Display error to user (using your preferred method)
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',Helvetica]">
      <Navbar />
      <div className="h-24"></div>
      <div className="max-w-3xl mx-auto px-4 py-4">
        <Card className="p-6 border-none shadow-none">
          <h1 className="text-3xl font-bold text-center">Create Your AI Travel Itinerary</h1>
          
          <Separator className="my-2" />
          
          <div className="mb-6 flex justify-center">
            <div className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-[#DD8256] text-white' : 'bg-gray-200'}`}>1</div>
              <div className={`h-1 w-16 ${step > 1 ? 'bg-[#DD8256]' : 'bg-gray-200'}`}></div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-[#DD8256] text-white' : 'bg-gray-200'}`}>2</div>
              <div className={`h-1 w-16 ${step > 2 ? 'bg-[#DD8256]' : 'bg-gray-200'}`}></div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? 'bg-[#DD8256] text-white' : 'bg-gray-200'}`}>3</div>
            </div>
          </div>

          {/* Step 1: Destination Selection */}
          {step === 1 && (
            <div className="flex flex-col items-center">
              <h2 className="mb-2 text-center text-2xl font-semibold">Where do you want to go?</h2>
              <p className="mb-6 text-center text-gray-600">We'll create a custom itinerary for your trip.</p>

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
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </div>
                  <Input
                    ref={inputRef}
                    type="text"
                    value={formData.location}
                    onChange={handleLocationChange}
                    onFocus={() => formData.location && setShowSuggestions(true)}
                    placeholder="e.g., Chikmagalur, India"
                    className="w-full pl-10 rounded-4xl"
                  />
                </div>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button
                onClick={nextStep}
                disabled={!formData.location.trim()}
                className="w-[100px] rounded-4xl py-2 bg-[#DD8256] hover:bg-[#c27249] text-white"
              >
                Next
              </Button>
            </div>
          )}

          {/* Step 2: Number of Days Selection */}
          {step === 2 && (
            <div className="flex flex-col items-center">
              <h2 className="mb-2 text-center text-xl font-bold">How many days will you stay?</h2>
              <p className="mb-6 text-center text-gray-600">Choose the number of days for your trip to {formData.location}</p>

              <div className="mb-8 w-full max-w-md">
                <div className="flex items-center justify-center">
                  <button 
                    onClick={() => formData.days > 1 && setFormData({ ...formData, days: formData.days - 1 })}
                    className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                    disabled={formData.days <= 1}
                  >
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
                      className="h-5 w-5"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>

                  <Input
                    type="number"
                    min="1"
                    max="14"
                    value={formData.days}
                    onChange={handleDaysChange}
                    className="mx-4 w-16 text-center text-xl font-medium"
                  />

                  <button 
                    onClick={() => formData.days < 14 && setFormData({ ...formData, days: formData.days + 1 })}
                    className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                    disabled={formData.days >= 14}
                  >
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
                      className="h-5 w-5"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex w-full max-w-md justify-between">
                <Button 
                  onClick={prevStep} 
                  variant="outline" 
                  className="text-sm rounded-4xl font-medium text-gray-700"
                >
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-[#DD8256] rounded-4xl hover:bg-[#c27249] text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Interest Selection */}
          {step === 3 && (
            <div className="flex flex-col items-center">
              <h2 className="mb-2 text-center text-xl font-bold">Tell us about your preferences</h2>
              <p className="mb-6 text-center text-gray-600">
                Select interests and add additional preferences for your trip to {formData.location}.
              </p>

              <div className="w-full mb-6">
                <p className="text-sm font-medium mb-2">Select your interests:</p>
                <div className="mb-4 flex w-full flex-wrap gap-2">
                  {interestCategories.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        formData.interests.includes(interest)
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {formData.interests.includes(interest) && (
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
                          className="mr-1 inline-block h-3 w-3 text-green-600"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {interest}
                    </button>
                  ))}

                  {showCustomInput ? (
                    <div className="flex items-center rounded-full bg-gray-100 px-3">
                      <input
                        type="text"
                        value={customInterest}
                        onChange={(e) => setCustomInterest(e.target.value)}
                        placeholder="Enter custom interest"
                        className="flex-1 bg-transparent py-1.5 text-sm focus:outline-none"
                        onKeyDown={(e) => e.key === "Enter" && addCustomInterest()}
                      />
                      <button onClick={addCustomInterest} className="ml-2 text-gray-600 hover:text-gray-900">
                        Add
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowCustomInput(true)}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-200"
                    >
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
                        className="mr-1 inline-block h-3 w-3"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Add interest
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full space-y-2 mb-6">
                <label htmlFor="preferences" className="block text-sm font-medium">
                  Additional Preferences
                </label>
                <textarea
                  id="preferences"
                  name="preferences"
                  placeholder="Tell us about your preferences (e.g., vegetarian food, adventure level, accommodation preferences, budget constraints, etc.)"
                  value={formData.preferences}
                  onChange={handlePreferencesChange}
                  className="w-full min-h-[20px] rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {/* Example: "I prefer vegetarian food, moderate adventure activities, budget-friendly accommodations, and want to avoid crowds." */}
                </p>
              </div>

              <div className="flex w-full justify-between">
                <Button 
                  onClick={prevStep} 
                  variant="outline" 
                  className="text-sm font-medium rounded-4xl text-gray-700"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-[#DD8256] rounded-full hover:bg-[#c27249] text-white"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Itinerary...
                    </span>
                  ) : 'Generate Itinerary'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}