'use client';

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Features", href: "#features" },
  { title: "Recommedations", href:"/recom"},
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed w-full h-[75px] top-0 left-0 z-50 bg-white">
      <div className="max-w-[1440px] h-full mx-auto flex items-center justify-between px-4 md:px-8 lg:px-[100px]">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-7">
            <Image src="/image.png" alt="Cultura Logo" width={30} height={30} />
          </div>
          <span className="font-['Plus_Jakarta_Sans',Helvetica] font-bold pb-2 text-[#ff3967] text-xl md:text-2xl">
            cultura
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`font-['Plus_Jakarta_Sans',Helvetica] font-semibold text-base lg:text-lg ${
                pathname === link.href ? "text-[#ff3967]" : "text-[#0b2727]"
              }`}
            >
              {link.title}
            </Link>
          ))}

          <Button
            variant="ghost"
            className="font-['Plus_Jakarta_Sans',Helvetica] font-semibold text-[#0b2727] text-base lg:text-lg rounded-[50px]"
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button className=" bg-[#DD8256] hover:bg-[#e02e55] font-['Plus_Jakarta_Sans',Helvetica] font-semibold text-white text-base lg:text-lg rounded-[50px]">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        <Button variant="ghost" className="md:hidden" aria-label="Open menu">
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
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </div>
    </header>
  );
}
