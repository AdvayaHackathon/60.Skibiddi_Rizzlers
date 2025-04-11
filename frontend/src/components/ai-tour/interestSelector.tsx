"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface InterestSelectionProps {
  onSubmit: (interests: string[]) => void
  onBack: () => void
  isLoading?: boolean;
}

// Sample interests data
const interestCategories = [
  "Adventure", "Art & Culture", "Family-friendly", "Food & Drink", 
  "Historical", "Luxury", "Nature", "Nightlife", "Relaxation", 
  "Shopping", "Spiritual", "Wildlife"
]

export default function InterestSelection({ onSubmit, onBack, isLoading = false }: InterestSelectionProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const router = useRouter()

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleSubmit = () => {
    if (selectedInterests.length > 0) {
      onSubmit(selectedInterests)
      router.push("/ai-tour/itinerary") 
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0b2727] mb-2">What are you interested in?</h2>
        <p className="text-[#6e7074]">Select all that apply to personalize your trip</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {interestCategories.map((interest) => (
          <div key={interest} className="flex items-center space-x-2">
            <Checkbox 
              id={interest} 
              checked={selectedInterests.includes(interest)}
              onCheckedChange={() => toggleInterest(interest)}
              disabled={isLoading}
            />
            <label 
              htmlFor={interest} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {interest}
            </label>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={isLoading}
          className="w-1/3"
        >
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="w-2/3 bg-[#dd8256] hover:bg-[#c27249] text-white"
          disabled={isLoading || selectedInterests.length === 0}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Itinerary...
            </span>
          ) : (
            "Generate Itinerary"
          )}
        </Button>
      </div>
    </div>
  )
}
