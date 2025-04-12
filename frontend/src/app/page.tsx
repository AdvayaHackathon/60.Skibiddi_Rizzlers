import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Navbar from "@/components/home/navbar";
import { Search } from "lucide-react";

// Data for features section
const featuresData = [
  {
    id: 1,
    title: "Arts and Crafts Adventure",
    description:
      "Dive into the world of traditional artistry. Learn to craft, paint, and sculpt unique cultural treasures.",
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/frame-2.png",
  },
  {
    id: 2,
    title: "Culinary Quest",
    description:
      "Embark on a flavorful journey to discover global cuisines. Learn recipes, cooking techniques, and the stories behind each dish.",
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/frame-3.png",
  },
  {
    id: 3,
    title: "Heritage Trails",
    description:
      "Walk through history's landmarks and monuments. Uncover the rich heritage and stories behind iconic sites.",
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/frame-4.png",
  },
];

// Data for service cards
const serviceCards = [
  {
    id: 1,
    title: "AI Tour",
    description: "Lorem ipsum dolor sit amet, adipisicing elit.",
    link: "/ai-tour"
  },
  {
    id: 2,
    title: "Best Tour Guide",
    description: "Lorem ipsum dolor sit amet, adipisicing elit.",
  },
  {
    id: 3,
    title: "Heritage Whisperer",
    description: "Let monuments and artifacts tell their own stories.",
    link: "/folk-lore"
  },
];

// Data for bottom section
const bottomFeatures = [
  {
    id: 1,
    title: "DNA to culture",
    description: "Uncover your cultural DNA and explore your roots",
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/image-2.png",
  },
  {
    id: 2,
    title: "AI tour guides",
    description: "Explore the world's cultures with AI-powered tour guides",
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/image.png",
  },
  {
    id: 3,
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/image-1.png",
  },
];

export default function Home() {
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1440px] relative mx-auto">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <section className="w-full max-w-[1175px] h-[300px] sm:h-[450px] md:h-[614px] mx-auto mt-6 sm:mt-12 md:mt-26 bg-[url(https://c.animaapp.com/m98xlrfqw6Iebg/img/frame-53.png)] bg-cover bg-center">
          <div className="flex flex-col items-center justify-center h-full px-4">
            <h1 className="text-center  font-['Montserrat',Helvetica] font-bold [text-shadow:6px_3px_4px_#00000040] text-black text-2xl sm:text-3xl md:text-[40px] leading-tight sm:leading-[55px] mb-8 sm:mb-12 md:mb-20">
              REDISCOVER INDIA THROUGH <br className="hidden sm:inline" />
              STORIES &amp; VIBRANT CULTURE
            </h1>

            {/* Search Bar */}
            

            {/* search bar*/}
           

          </div>
        </section>

        {/* Services Section */}
        <section className="w-full bg-white py-8 sm:py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-2.5 w-full md:w-[300px]">
              <div className="font-['Plus_Jakarta_Sans',Helvetica] font-normal text-[#ee6e6e] text-2xl sm:text-[32px]">
                What we serve
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',Helvetica] font-medium text-heading-color text-lg sm:text-[20px] leading-normal">
                Reimagining Culture <br />
                Through Technology
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-3 gap-6">
              {serviceCards.map((service) => (
                <Card
                  key={service.id}
                  className="w-full md:w-[200px] h-[150px] rounded-2xl border-[#0b2727]"
                >
                  <CardContent className="p-1">
                    <div className="mt-2 mb-8 ml-[19px]">
                      <h3 className="font-['Plus_Jakarta_Sans',Helvetica] font-medium text-black text-lg">
                        {service.title}
                      </h3>
                      <p className="font-['Plus_Jakarta_Sans',Helvetica] font-normal text-text-color text-sm mb-1 mt-2">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white py-8 sm:py-12 md:py-16" id="features">
          <div className="max-w-[1140px] mx-auto px-4">
            <h2 className="font-['Montserrat',Helvetica] font-medium text-heading-color text-2xl sm:text-[32px] mt-4 mb-4 sm:mb-4 ml-2">
              Explore&nbsp;&nbsp;our features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuresData.map((feature) => (
                <Card key={feature.id} className="border-none shadow-none">
                  <CardContent className="p-0">
                    <div
                      className="w-full h-[200px] sm:h-[266px] rounded-xl mb-3 bg-cover bg-center"
                      style={{ backgroundImage: `url(${feature.image})` }}
                    >
                      {feature.id === 3 && (
                        <Image
                          width={500}
                          height={266}
                          className="w-full h-full object-cover"
                          alt={feature.title}
                          src="https://c.animaapp.com/m98xlrfqw6Iebg/img/image-4.png"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans',Helvetica] font-medium text-[#1c140c] text-base leading-6">
                        {feature.title}
                      </h3>
                      <p className="font-['Plus_Jakarta_Sans',Helvetica] font-normal text-[#96724f] text-sm leading-[21px] mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Features Section */}
        <section className="w-full bg-white py-8 sm:py-12 md:py-16">
          <div className="max-w-[1140px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bottomFeatures.map((feature) => (
              <div key={feature.id} className="relative">
                <div className="rounded-xl overflow-hidden">
                  <Image
                    width={500}
                    height={260}
                    className="w-full h-[200px] sm:h-[260px] object-cover"
                    alt={feature.title || "Feature image"}
                    src={feature.image}
                  />
                </div>
                {feature.title && (
                  <div className="mt-4">
                    <h3 className="font-['Inter',Helvetica] font-medium text-[#1c140c] text-base leading-6">
                      {feature.title}
                    </h3>
                    <p className="font-['Inter',Helvetica] font-normal text-[#96724f] text-sm leading-[21px] mt-1">
                      {feature.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
