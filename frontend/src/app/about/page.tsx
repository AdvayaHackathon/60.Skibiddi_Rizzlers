import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

export default function About() {
  return (
    <div className="bg-white flex flex-col justify-center w-full">
      <Navbar />
      <div className="bg-white overflow-hidden w-full relative">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[606px] mx-auto mt-[85px]">
          <div className="absolute w-full h-full top-0 left-0 opacity-50 bg-[url(https://c.animaapp.com/m98wft3q5LfKpa/img/image-27.png)] bg-cover bg-[50%_50%]" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 [text-shadow:9px_4px_4px_#00000040] font-['Montserrat',Helvetica] font-bold text-white text-4xl md:text-5xl lg:text-[64px] tracking-[0] leading-[1.2] whitespace-nowrap text-center">
            ABOUT US
          </div>
        </div>

        {/* Who We Are Section */}
        <Card className="border-none shadow-none w-full max-w-[1252px] mx-auto mt-8 md:mt-12 lg:mt-[44px] px-4 md:px-8 lg:px-0">
          <CardContent className="p-0">
            <div className="flex flex-col w-full md:w-[702px] items-start gap-2.5">
              <h2 className="font-['Montserrat',Helvetica] font-medium text-2xl md:text-3xl lg:text-[35px] tracking-[0] leading-normal">
                <span className="text-[#0b2727]">Who </span>
                <span className="text-[#dd8256]">We Are?</span>
              </h2>
              <p className="font-['Montserrat',Helvetica] font-medium text-heading-color text-base md:text-lg tracking-[0] leading-[1.6] md:leading-[30px]">
                At Cultura, we&apos;re passionate about blending the timeless
                richness of culture with the endless possibilities of
                technology. Born from a desire to preserve and promote global heritage, our mission is to make
                cultural exploration accessible, immersive, and unforgettable
                for everyone.
              </p>
              <p className="font-['Montserrat',Helvetica] font-medium text-heading-color text-base md:text-lg tracking-[0] leading-[1.6] md:leading-[30px] mt-4">
                From ancient traditions to modern innovations, we create digital
                experiences that connect people to the stories, flavors, art,
                and spirit of cultures around the world.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Our Mission Section */}
        <Card className="border-none shadow-none w-full max-w-[1252px] mx-auto mt-8 md:mt-12 lg:mt-[50px] px-4 md:px-8 lg:px-0">
          <CardContent className="p-0">
            <div className="flex flex-col w-full items-start gap-2.5">
              <h2 className="font-['Montserrat',Helvetica] font-medium text-2xl md:text-3xl lg:text-[35px] tracking-[0] leading-normal">
                <span className="text-[#0b2727]">Our </span>
                <span className="text-[#dd8256]">Mission</span>
              </h2>
              <p className="font-['Montserrat',Helvetica] font-medium text-heading-color text-base md:text-lg tracking-[0] leading-[1.6] md:leading-[30px]">
                We aim to redefine cultural tourism through technology-driven
                experiences that go beyond sightseeing. Whether you&apos;re exploring
                your roots with our DNA to Culture Explorer, reliving history
                with AR Time Travel, or tasting the world through our Recipe AR
                App, Cultura is your gateway to a deeper connection with
                heritage.
              </p>
              <p className="font-['Montserrat',Helvetica] font-medium text-heading-color text-base md:text-lg tracking-[0] leading-[1.6] md:leading-[30px] mt-4">
                We believe that every culture has a story worth telling — and
                we&apos;re here to make sure it&apos;s not only remembered, but relived.
              </p>
            </div>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </div>
  );
};
