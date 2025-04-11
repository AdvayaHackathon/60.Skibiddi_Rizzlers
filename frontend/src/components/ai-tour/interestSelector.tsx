"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" 

interface InterestSelectionProps {
  onSubmit: (interests: string[]) => void
  onBack: () => void
}

// Sample interests data
const interestCategories = [
  "Must-see Attractions",
  "Great Food",
  "Hidden Gems",
  "Tours & Experiences",
  "French Colonial Architecture",
  "Spiritual Tourism",
  "Beach Relaxation",
  "Local Cuisine",
  "Yoga and Wellness",
  "Art and Craft",
  "Adventure and Sports",
  "Arts & Theatre",
]

export default function InterestSelection({ onSubmit, onBack }: InterestSelectionProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const router = useRouter()

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest)) {
      setSelectedInterests([...selectedInterests, customInterest])
      setCustomInterest("")
      setShowCustomInput(false)
    }
  }

  const handleSubmit = () => {
    onSubmit(selectedInterests)
    router.push("/ai-tour/itinerary") 
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-2 text-center text-3xl font-bold">Pick your interests</h1>
      <p className="mb-8 text-center text-gray-600">Select all that apply.</p>

      <div className="mb-8 flex w-full flex-wrap justify-center gap-2">
        {interestCategories.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedInterests.includes(interest)
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {selectedInterests.includes(interest) && (
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
                className="mr-1 inline-block h-4 w-4 text-green-600"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {interest}
          </button>
        ))}

        {showCustomInput ? (
          <div className="flex w-full max-w-xs items-center rounded-full bg-gray-100 px-3">
            <input
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="Enter custom interest"
              className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && addCustomInterest()}
            />
            <button onClick={addCustomInterest} className="ml-2 text-gray-600 hover:text-gray-900">
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCustomInput(true)}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
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
              className="mr-1 inline-block h-4 w-4"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add interest
          </button>
        )}
      </div>

      <div className="flex w-full max-w-md justify-between">
        <button onClick={onBack} className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:underline">
          Back
        </button>
        <button
          onClick={handleSubmit}

          disabled={selectedInterests.length === 0}
          className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
