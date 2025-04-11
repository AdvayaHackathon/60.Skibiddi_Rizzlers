"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Navbar from "@/components/home/navbar"

export default function StreetViewExplorer() {
  const [location, setLocation] = useState("")
  const [streetViewUrl, setStreetViewUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const loadStreetView = async () => {
    if (!location.trim()) {
      setError("Please enter a location.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
      )
      const data = await response.json()

      if (!data.length) {
        setError("Location not found.")
        setIsLoading(false)
        return
      }

      const lat = data[0].lat
      const lon = data[0].lon

      // You'll need to add your Google Maps API key as an environment variable
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      console.log("API Key:", apiKey)

      const embedURL = `https://www.google.com/maps/embed/v1/streetview?key=${apiKey}&location=${lat},${lon}&heading=210&pitch=10&fov=90`

      setStreetViewUrl(embedURL)
      console.log("Loaded:", lat, lon)
    } catch (error) {
      console.error("Error:", error)
      setError("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-8  font-['Plus_Jakarta_Sans',Helvetica] mt-10">Explore the monuments</h1>

      <div className="flex w-full max-w-xl mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search for places"
            className="w-full py-3 px-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onKeyDown={(e) => e.key === "Enter" && loadStreetView()}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
        </div>
        <button
          onClick={loadStreetView}
          disabled={isLoading}
          className="ml-2 px-6 py-3 bg-[#e8a07a] text-white font-medium rounded-full hover:bg-[#d8906a] transition-colors"
        >
          GO
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="w-full max-w-5xl h-[60vh] rounded-2xl border border-gray-200 overflow-hidden">
        {streetViewUrl ? (
          <iframe
            src={streetViewUrl}
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
            title="Street View"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Enter a location to view street view
          </div>
        )}
      </div>
    </div>
  )
}
