"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Validate form
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required")
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch("http://localhost:8000/user/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || Object.values(data).flat().join(", ") || "Registration failed")
      }
      
      // Registration successful, redirect to login
      router.push("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration")
      console.error("Registration error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] relative overflow-hidden">
      {/* Background pattern */}
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
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 z-10">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            className="rounded-full border-[#676666] h-12 px-4"
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="rounded-full border-[#676666] h-12 px-4"
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className="rounded-full border-[#676666] h-12 px-4"
          />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            className="rounded-full border-[#676666] h-12 px-4"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-[#dd8256] hover:bg-[#dd8256]/90 text-white font-medium"
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
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

