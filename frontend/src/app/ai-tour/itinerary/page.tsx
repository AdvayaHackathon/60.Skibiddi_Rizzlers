"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/home/navbar";

interface ItineraryDay {
  day_number: number;
  itinerary: string;
  location_images: string[];
  location_description: string;
}

interface ItineraryData {
  itinerary: ItineraryDay[];
}

export default function ItineraryPage() {
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the itinerary data from localStorage
    const storedData = localStorage.getItem('itineraryData');
    if (storedData) {
      setItineraryData(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="h-24"></div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="w-full h-48 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-full h-96 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!itineraryData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="h-24"></div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-2">No itinerary data found</h2>
              <p className="text-gray-600">Please create a new itinerary</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-24"></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <h1 className="text-3xl font-bold">Your Travel Itinerary</h1>
          </CardContent>
        </Card>

        {itineraryData.itinerary.map((day) => (
          <Card key={day.day_number} className="mb-6 overflow-hidden">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#DD8256] mb-4">
                Day {day.day_number}
              </h2>

              {day.location_description && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-gray-700">{day.location_description}</p>
                </div>
              )}

              <p className="whitespace-pre-line mb-6 text-gray-700">{day.itinerary}</p>

              {day.location_images && day.location_images.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <h3 className="text-xl font-semibold mb-4">Places to Visit</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {day.location_images.map((image, index) => (
                      <Card key={index} className="overflow-hidden border-none shadow-sm">
                        <div className="relative h-48 w-full">
                          <Image
                            src={image}
                            alt={`Day ${day.day_number} destination ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

