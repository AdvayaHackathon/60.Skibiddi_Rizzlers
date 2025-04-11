"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/home/navbar";

export default function CreateTour() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    days: 3,
    preferences: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/content/itinerary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: formData.location,
          days: formData.days,
          preferences: formData.preferences
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      
      // Store the itinerary data in localStorage for the next page
      localStorage.setItem('itineraryData', JSON.stringify(data));
      
      // Redirect to the itinerary page
      router.push('/ai-tour/itinerary');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-24"></div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Create Your AI Travel Itinerary</h1>
          
          <Separator className="my-6" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium">
                Destination Location
              </label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Chikmagalur, India"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="days" className="block text-sm font-medium">
                Number of Days
              </label>
              <Input
                id="days"
                name="days"
                type="number"
                min="1"
                max="14"
                value={formData.days}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="preferences" className="block text-sm font-medium">
                Your Preferences
              </label>
              <textarea
                id="preferences"
                name="preferences"
                placeholder="Tell us about your preferences (e.g., vegetarian food, adventure level, interests, accommodation preferences, budget constraints, etc.)"
                value={formData.preferences}
                onChange={handleChange}
                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: "I prefer vegetarian food, moderate adventure activities, interested in historical sites, budget-friendly accommodations, and want to avoid crowds."
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-2 bg-[#DD8256] hover:bg-[#c27249] text-white"
              disabled={loading}
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
          </form>
        </Card>
      </div>
    </div>
  );
}