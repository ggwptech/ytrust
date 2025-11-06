"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { Play, TrendingUp, Eye, DollarSign } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              YouTube Revenue Leaderboard
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Top YouTube
            <br />
            <span className="text-red-600">Revenue Leaders</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore the transparent community of creators sharing their revenue data. See the leaderboard, compete, learn, and grow together.
          </p>

          <Link
            href="/dashboard"
            style={{backgroundColor: '#dc2626', color: '#ffffff'}}
            className="inline-block px-8 py-4 text-lg font-medium rounded-full hover:shadow-xl transition-all shadow-lg"
          >
            Start Explore
          </Link>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real Revenue Data
              </h3>
              <p className="text-gray-600">
                Direct integration with YouTube Analytics API for authentic revenue metrics
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Live Leaderboard
              </h3>
              <p className="text-gray-600">
                See how your channel ranks against other creators in real-time
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-50">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Privacy Control
              </h3>
              <p className="text-gray-600">
                Choose to show your channel name publicly or stay anonymous
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 YTrust. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-red-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-red-600 transition-colors">
                Terms of Service
              </Link>
              <a href="mailto:lutinlutin76@gmail.com" className="hover:text-red-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
