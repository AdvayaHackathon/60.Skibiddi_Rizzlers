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

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#676666] border-opacity-20"></div>
            </div>
            <div className="relative px-4 text-[#ff3967] text-sm font-medium bg-white">OR</div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="rounded-full w-12 h-12 p-0 border border-[#676666] border-opacity-30 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button
              type="button"
              className="rounded-full w-12 h-12 p-0 border border-[#676666] border-opacity-30 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1877F2">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
            </button>
            <button
              type="button"
              className="rounded-full w-12 h-12 p-0 border border-[#676666] border-opacity-30 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#000000">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.68 1.95-1.83 3.89-3.53 5.08zm-1.3-15.2c-.13 1.86 1.38 3.48 3.01 3.75.02-2.9-2.99-4.37-3.01-3.75z" />
              </svg>
            </button>
          </div>

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

