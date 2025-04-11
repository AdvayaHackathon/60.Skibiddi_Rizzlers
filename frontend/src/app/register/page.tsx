"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] relative overflow-hidden">
      {/* Background pattern - would be replaced with actual image in production */}
      <div className="absolute inset-0 opacity-10 z-0">
        <Image
          src="/login-bg.jpg"
          alt="Cultural background"
          className="w-full h-full object-cover"
          fill
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8 relative">
          <h1 className="text-[#0b2727] text-3xl md:text-4xl font-bold mb-2">CREATE AN ACCOUNT</h1>



          <p className="text-[#6e7074] text-sm">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-[#ff3967] hover:underline">
              Terms and Conditions
            </a>{" "}
            {/* <a href="#" className="text-[#ff3967] hover:underline">
              Privacy policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#ff3967] hover:underline">
              Terms of use
            </a> */}

          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 z-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded-full border-[#676666]  h-12 px-4"
              />
            </div>
            <div>
              <Input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="rounded-full border-[#676666] h-12 px-4"
              />
            </div>
          </div>

          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-full border-[#676666] h-12 px-4"
          />

          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-full border-[#676666] h-12 px-4"
          />

          <Input
            name="mobile"
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="rounded-full border-[#676666]  h-12 px-4"
          />

          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-[#dd8256] hover:bg-[#dd8256]/90 text-white font-medium"
          >
            CREATE ACCOUNT
          </Button>

          

          <div className="text-center mt-6">
            <p className="text-[#6e7074] text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#ff3967] font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

