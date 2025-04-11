"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface CitySelectionProps {
  onSubmit: (city: string) => void
}

// Sample popular destinations data
const popularDestinations = [
  { id: 1, name: "Port Blair", country: "India", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Havelock Island", country: "India", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Side", country: "Türkiye", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Punta Cana", country: "Caribbean", image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Hyderabad", country: "India", image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Kochi (Cochin)", country: "India", image: "/placeholder.svg?height=100&width=100" },
]

// Sample cities for autocomplete
const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Rome",
  "Barcelona",
  "Dubai",
  "Singapore",
  "Hong Kong",
  "Bangkok",
  "Istanbul",
  "Amsterdam",
  "Berlin",
  "Prague",
  "Vienna",
  "Madrid",
  "Venice",
  "San Francisco",
  "Rio de Janeiro",
]

export default function CitySelection({ onSubmit }: CitySelectionProps) {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputValue.length > 0) {
      const filteredCities = cities.filter((city) => city.toLowerCase().includes(inputValue.toLowerCase()))
      setSuggestions(filteredCities)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [inputValue])

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue)
    }
  }

  const handleDestinationSelect = (destination: string) => {
    setInputValue(destination)
    onSubmit(destination)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-2 text-center text-4xl font-bold">First, where do you want to go?</h1>
      <p className="mb-8 text-center text-gray-600">You&apos;ll get custom recs you can save and turn into an itinerary.</p>

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
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => inputValue && setShowSuggestions(true)}
            placeholder="Choose a city or town"
            className="w-full rounded-full border border-gray-300 py-3 pl-10 pr-4 focus:border-gray-400 focus:outline-none"
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

      <div className="mb-8 w-full">
        <h2 className="mb-6 text-center text-xl font-medium">Or get started with a popular destination</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {popularDestinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => handleDestinationSelect(destination.name)}
              className="flex cursor-pointer flex-col items-center"
            >
              <div className="mb-2 overflow-hidden rounded-full">
                <Image
                  src={destination.image || "https://placehold.co/600x400"}
                  alt={destination.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-center text-sm font-medium">{destination.name}</h3>
              <p className="text-center text-xs text-gray-500">{destination.country}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!inputValue.trim()}
        className="rounded-full bg-gray-200 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
