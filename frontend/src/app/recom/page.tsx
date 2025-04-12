"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Star } from "lucide-react"
import Navbar from "@/components/home/navbar"

interface Place {
    name: string
    vicinity: string
    rating?: number
    price: number
}

export default function TouristRecommendations() {
    const [locationInput, setLocationInput] = useState("")
    const [restaurants, setRestaurants] = useState<Place[]>([])
    const [hotels, setHotels] = useState<Place[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

    const searchNearby = async () => {
        if (!locationInput.trim()) return

        setIsLoading(true)
        setError(null)
        setRestaurants([])
        setHotels([])

        try {
            const apiKey = "AIzaSyDmyuhWCgZJwueeUBMw65PuN7tTqDYAJ0Y"// Replace with your actual Google Maps API key

            const geoRes = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&key=${apiKey}`,
            )
            const geoData = await geoRes.json()

            if (geoData.status !== "OK") throw new Error("Location not found")

            const { lat, lng } = geoData.results[0].geometry.location

            const restaurantsRes = await fetch(`http://127.0.0.1:5000/places?lat=${lat}&lng=${lng}&type=restaurant`)
            const restaurantsData = await restaurantsRes.json()

            const hotelsRes = await fetch(`http://127.0.0.1:5000/places?lat=${lat}&lng=${lng}&type=lodging`)
            const hotelsData = await hotelsRes.json()

            const restaurantsWithPrices = restaurantsData.results.map((place: any) => ({
                ...place,
                price: Math.floor(Math.random() * (5000 - 500 + 1)) + 500,
            }))

            const hotelsWithPrices = hotelsData.results.map((place: any) => ({
                ...place,
                price: Math.floor(Math.random() * (5000 - 500 + 1)) + 500,
            }))

            setRestaurants(restaurantsWithPrices)
            setHotels(hotelsWithPrices)
        } catch (err: any) {
            setError(err.message || "An error occurred while searching")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleBookNow = (place: Place) => {
        setSelectedPlace(place)
        setIsModalOpen(true)
    }

    const handlePayment = () => {
        if (!selectedPlace) return

        alert(`🎉 Payment successful! You booked ${selectedPlace.name} for ₹${selectedPlace.price}`)
        setIsModalOpen(false)
    }

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8 font-['Plus_Jakarta_Sans',Helvetica]">
            <Navbar/>
            <h1 className="pt-24 text-4xl font-bold text-center text-[#2c3e50] mb-8">Recommendations</h1>

            <div className="flex flex-col h-[30px] sm:flex-row gap-4 justify-center mb-12">
                <Input
                    type="text"
                    placeholder="Enter a landmark (e.g. Mysore Palace)"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="max-w-md rounded-full border-gray-300 shadow-sm"
                />
                <Button onClick={searchNearby} disabled={isLoading} className="bg-[#dd8256]  rounded-full text-white hover:bg-[#e9a17d] px-6">
                    {isLoading ? "Searching..." : "Search Nearby"}
                    {!isLoading && <Search className="ml-2 h-5 w-5" />}
                </Button>
            </div>

            {error && <div className="text-red-500 text-center mb-6">{error}</div>}

            <div className="space-y-12">
                <section>
                    <h2 className="text-3xl font-semibold text-[#2c3e50] mb-6">Places to Stay</h2>
                    {hotels.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2">
                            {hotels.map((place, index) => (
                                <PlaceCard key={index} place={place} onBookNow={handleBookNow} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">{isLoading ? "Loading..." : "No hotels found nearby."}</p>
                    )}
                </section>

                <section>
                    <h2 className="text-3xl font-semibold text-[#2c3e50] mb-6">Local Restaurant Picks</h2>
                    {restaurants.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {restaurants.map((place, index) => (
                                <PlaceCard key={index} place={place} onBookNow={handleBookNow} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">{isLoading ? "Loading..." : "No restaurants found nearby."}</p>
                    )}
                </section>
            </div>

            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                place={selectedPlace}
                onPayment={handlePayment}
            />
        </div>
    )
}

function PlaceCard({ place, onBookNow }: { place: Place; onBookNow: (place: Place) => void }) {
    return (
        <Card className="h-[205px] w-[250px] shadow-lg mb-4 border-black border">

            <CardContent className="">
                <CardTitle className="text-lg font-semibold mb-2">{place.name}</CardTitle>
                <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 shrink-0" />
                    <p className="text-xs text-gray-600">{place.vicinity}</p>
                </div>
                <div className="flex items-center gap-1">
                    <p className="font-bold text-sm p-2">₹{place.price}</p>
                    <Star className="h-3 w-3 text-yellow-500" />
                    <p className="text-sm">{place.rating || "N/A"}</p>
                </div>
                <Button onClick={() => onBookNow(place)} className="w-full p-2 rounded-full bg-[#d04baf] text-white  hover:bg-[#2980b9]">
                    Book Now
                </Button>
            </CardContent>

        </Card>
    )
}

function PaymentModal({
    isOpen,
    onClose,
    place,
    onPayment,
}: {
    isOpen: boolean
    onClose: () => void
    place: Place | null
    onPayment: () => void
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle>Complete Your Booking</DialogTitle>
                </DialogHeader>

                {place && (
                    <div className="space-y-4">
                        <p className="text-sm">
                            Booking for: <span className="font-semibold">{place.name}</span> — ₹{place.price}
                        </p>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name on Card</Label>
                                <Input id="name" placeholder="John Doe" />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="card">Card Number</Label>
                                <Input id="card" placeholder="1234 5678 9012 3456" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={onClose} className="sm:order-first order-last rounded-full">
                        Cancel
                    </Button>
                    <Button onClick={onPayment} className="bg-[#dd8256] rounded-full hover:bg-[#dd8356e5]">
                        Pay Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}