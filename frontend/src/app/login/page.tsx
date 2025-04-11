'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt with:', { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background pattern - faded cultural imagery */}
      <div className="absolute inset-0 opacity-10 z-0">
        <Image
          src="/login-bg.jpg"
          alt="Cultural background"
          className="w-full h-full object-cover"
          fill
          priority
        />
      </div>

      {/* Login Form */}
      <div className="max-w-md w-full px-6 z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#0b2727] mb-2">Welcome</h1>
          <p className="text-[#6e7074]">Login with Email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-4 px-4 rounded-full border border-[#6e7074] border-opacity-30 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#dd8256] focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-4 px-4 rounded-full border border-[#6e7074] border-opacity-30 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#dd8256] focus:border-transparent"
            />
          </div>
          <div className="text-right">
            <Link href="#" className="text-[#ff3967] text-sm hover:underline">
              Forgot your password?
            </Link>
          </div>
          <div>
            <button 
              type="submit"
              className="w-full py-4 bg-[#dd8256] hover:bg-[#dd8256]/90 text-white rounded-full transition-colors"
            >
              LOGIN
            </button>
          </div>

  
          

          <div className="text-center mt-6">
            <p className="text-[#6e7074]">
              Don&apos;t have account? 
              <Link href="/register" className="text-[#ff3967] ml-1 hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

