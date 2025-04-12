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
          <Card className="p-8 text-center border-none shadow-none">
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
    <div className="min-h-screen bg-white ">
      <Navbar />
      <div className="h-6"></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="mb-2  border-none shadow-none">
          <CardContent className="p-6 text-center">
            <h1 className="text-3xl font-bold">Your Travel Itinerary</h1>
          </CardContent>
        </Card>

        {itineraryData.itinerary.map((day) => (
          <Card key={day.day_number} className="mb-6 overflow-hidden">
            <CardContent className="">
              <div className="text-2xl flex gap-4 font-bold text-[#DD8256] mb-4">
                Day {day.day_number} : 
                {day.location_description && (
                  <p className="text-gray-700">{day.location_description}</p>
              )}

              </div>

              
              <p className="whitespace-pre-line mb-6 text-gray-800 text-md">
                {day.itinerary.split(':').slice(1).join(':').trim()}
              </p>
              {day.location_images && day.location_images.length > 0 && (
                <div className="mb-">
                  <h3 className="text-xl font-semibold mb-0">Places to Visit</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 ">
                    {day.location_images.map((image, index) => (
                      <Card key={index} className="overflow-hidden border-none rounded-lg shadow-none">
                        <div className="relative h-30 w-30">
                          <Image
                            src={image}
                            alt={`Day ${day.day_number} destination ${index + 1}`}
                            fill
                            className="object-cover rounded-2xl"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from 'react';
// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
// import Navbar from "@/components/home/navbar";

// interface ItineraryDay {
//   day_number: number;
//   itinerary: string;
//   location_images: string[];
//   location_description: string;
// }

// interface ItineraryData {
//   itinerary: ItineraryDay[];
// }

// export default function ItineraryPage() {
//   const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Retrieve the itinerary data from localStorage
//     const storedData = localStorage.getItem('itineraryData');
//     if (storedData) {
//       setItineraryData(JSON.parse(storedData));
//     }
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="h-24"></div>
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="w-full h-48 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
//           {[1, 2, 3].map((item) => (
//             <div key={item} className="w-full h-96 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!itineraryData) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="h-24"></div>
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <Card className="p-8 text-center">
//             <CardContent>
//               <h2 className="text-2xl font-semibold mb-2">No itinerary data found</h2>
//               <p className="text-gray-600">Please create a new itinerary</p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <div className="p-6">
//         <h1 className="text-3xl font-bold text-center mt-8 mb-8">YOUR TRAVEL ITINERARY</h1>
        
//         <div className= "">
//           {/* Left column - Itinerary Timeline */}
//           <div className="w-full md:w-1/2">
//             <div className="relative">
//               {itineraryData.itinerary.map((day, index) => (
//                 <div key={day.day_number} className="mb-4">
//                   <div className="flex items-start">
//                     {/* Day number and vertical line */}
//                     <div className="mr-4 flex flex-col items-center">
//                       <div className="font-bold text-xl mb-2">Day {day.day_number}</div>
//                       <div className="relative">
//                         <div className={`w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center ${index === 0 ? 'bg-black text-white' : ''}`}>
//                           {index === 0 && (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                             </svg>
//                           )}
//                           {index === 1 && (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
//                             </svg>
//                           )}
//                           {index === 2 && (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           )}
//                           {index === 3 && (
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                             </svg>
//                           )}
//                         </div>
//                         {index < itineraryData.itinerary.length - 1 && (
//                           <div className="absolute left-4 top-8 w-0.5 bg-gray-300 h-24 -translate-x-1/2"></div>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Card content */}
//                     <Card className="flex-1 mb-6 overflow-hidden">
//                       <CardContent className="p-0">
//                         <div className="flex">
//                           <div className="w-1/3">
//                             {day.location_images && day.location_images.length > 0 && (
//                               <div className="relative h-48">
//                                 <Image
//                                   src={day.location_images[0]}
//                                   alt={`Day ${day.day_number}`}
//                                   fill
//                                   className="object-cover"
//                                 />
//                               </div>
//                             )}
//                           </div>
//                           <div className="w-2/3 p-4">
//                             <h3 className="text-lg font-bold">Old Goa Heritage Walk by Make It Happen</h3>
//                             <p className="text-sm mt-2">{day.location_description || day.itinerary}</p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Right column - Map */}
          
//         </div>
//       </div>
//     </div>
//   );
// }