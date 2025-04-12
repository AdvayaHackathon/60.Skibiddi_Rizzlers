import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Navbar from "@/components/home/navbar";

// Data for features section
const featuresData = [
  {
    id: 1,
    title: "AI tour",
    description:"Discover the world's cultures with AI-powered tour guides, offering personalized and immersive cultural experiences",
    image: "https://i.pinimg.com/736x/0a/dd/23/0add237680f91d50688f95128e5d71bd.jpg",
    link: "/ai-tour",
  },
  {
    id: 2,
    title: "Monument Explorer",
    description: "Experience iconic monuments in real-time. Explore their beauty, history, and cultural significance through an immersive virtual journey.",
    image: "https://i.pinimg.com/474x/f4/fe/af/f4feafb239657656fe29b7d2701ef28b.jpg",
    link: "/monument-explorer"
  },
  {
    id: 3,
    title: "Heritage Trails",
    description:
      "Walk through history's landmarks and monuments. Uncover the rich heritage and stories behind iconic sites.",
    image: "https://i.pinimg.com/736x/36/7f/69/367f69281920ad1cfa40c3b6ccd84ae5.jpg",
    link: "/folk-lore"
  },
];

// Data for service cards
// Data for bottom section
const bottomFeatures = [
  {
    id: 1,
    title: "DNA to culture",
    description: "Uncover your cultural DNA and embark on a journey to explore your ancestral roots and traditions.",    
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/image-2.png",
  },
  {
    id: 2,
    title: "NFT tokens",
    image: "https://i.pinimg.com/474x/43/6d/a6/436da6bb28dc6a8e9b964671b2beac06.jpg",
    description: "Collect and explore digital stamps that celebrate the world's diverse cultures, traditions, and landmarks.",
  },
  {
    id: 3,
    title: "AR clothing try on",
    description: "Experience the future of fashion with AR technology. Try on traditional and modern clothing virtually and explore cultural styles.",
    image: "https://c.animaapp.com/m98xlrfqw6Iebg/img/image-1.png",
    link: "#",
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
            <h1 className="text-center font-['Montserrat',Helvetica] font-bold [text-shadow:6px_3px_4px_#00000040] text-black text-2xl sm:text-3xl md:text-[40px] leading-tight sm:leading-[55px] mb-8 sm:mb-12 md:mb-20">
              REDISCOVER INDIA THROUGH <br className="hidden sm:inline" />
              STORIES &amp; VIBRANT CULTURE
            </h1>

            {/* Search Bar */}
            {/* search bar*/}
          </div>
        </section>

        {/* Services Section */}
    
        {/* Features Section */}
        <section className="w-full bg-white py-8 sm:py-12 md:py-16" id="features">
          <div className="max-w-[1140px] mx-auto px-4">
            <h2 className="font-['Montserrat',Helvetica] font-medium text-heading-color text-2xl sm:text-[32px] mt-4 mb-4 sm:mb-4 ml-2">
              Explore&nbsp;&nbsp;our features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuresData.map((feature) => (
                <a
                  key={feature.id}
                  href={feature.link || "#"}
                  className="block"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                      <div
                        className="w-full h-[200px] sm:h-[266px] rounded-xl mb-3 bg-cover bg-center"
                        style={{ backgroundImage: `url(${feature.image})` }}
                      >
                        <Image
                          width={500}
                          height={260}
                          src={feature.image}
                          className="w-full h-[200px] sm:h-[266px] object-cover rounded-xl"
                          alt={feature.title}
                        />
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
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Features Section */}
        <section className="w-full bg-white py-8 sm:py-12 md:py-16">
          <div className="max-w-[1140px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bottomFeatures.map((feature) => (
              <a
                key={feature.id}
                href={feature.link || "#"}
                className="block"
                target="_self"
                rel="noopener noreferrer"
              >
                <div className="relative">
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
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}