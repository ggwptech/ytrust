"use client"

import { useSession, signOut, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Plus, X, LogOut } from "lucide-react"
import { formatRevenue } from "@/lib/utils"
import type { Channel } from "@/types"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [twitterHandle, setTwitterHandle] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch("/api/channels")
        if (response.ok) {
          const data = await response.json()
          setChannels(data)
        }
      } catch (error) {
        console.error("Failed to fetch channels:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChannels()
  }, [])

  const handleConnectChannel = async () => {
    if (!session) {
      signIn("google", { callbackUrl: "/dashboard" })
      return
    }

    setError("")
    setConnecting(true)

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twitterHandle: twitterHandle || undefined,
          isAnonymous,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to connect channel")
      }

      // Refresh channels list
      const channelsResponse = await fetch("/api/channels")
      if (channelsResponse.ok) {
        const data = await channelsResponse.json()
        setChannels(data)
      }

      setShowModal(false)
      setTwitterHandle("")
      setIsAnonymous(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setConnecting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-600 font-medium">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sign Out Button */}
        {session && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        <div className="mb-16 text-center">
          <h2 className="text-6xl font-bold text-gray-900 mt-8 mb-4 animate-fade-in drop-shadow-sm">
            Trusted Creators Leaderboard
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in-delay font-normal">
            Discover the top YouTube creators and their verified revenue performance
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="backdrop-blur-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-slide-up">
          <div className="px-8 py-8 flex justify-between items-center relative bg-white">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Revenue Leaderboard
              </h1>
              <p className="text-gray-700 mt-2 text-lg font-normal">
                Top YouTube creators ranked by revenue 🏆
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowModal(!showModal)}
                style={{backgroundColor: '#dc2626', color: '#ffffff'}}
                className="group inline-flex items-center space-x-2 px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm font-normal shadow-lg"
              >
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
                <span>Add Channel</span>
              </button>

              {/* Dropdown Modal */}
              {showModal && (
                <div style={{backgroundColor: '#ffffff', opacity: 1}} className="absolute right-0 mt-4 w-96 rounded-2xl shadow-2xl border-2 border-gray-400 z-50 p-6 animate-scale-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Add Channel</h3>
                    <button
                      onClick={() => {
                        setShowModal(false)
                        setError("")
                        setTwitterHandle("")
                        setIsAnonymous(false)
                      }}
                      className="text-gray-500 hover:text-gray-700 hover:rotate-90 transition-all duration-200"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                      <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div className="space-y-5">
                    {!session ? (
                      <div>
                        <p className="text-gray-700 text-sm mb-4 leading-relaxed font-medium">
                          Sign in with your Google account to connect your YouTube channel
                        </p>
                        <button
                          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                          style={{backgroundColor: '#dc2626', color: '#ffffff'}}
                          className="w-full py-3 px-4 rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                          Connect Google Account
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <button
                            onClick={handleConnectChannel}
                            disabled={connecting}
                            style={{backgroundColor: connecting ? '#9ca3af' : '#dc2626', color: '#ffffff'}}
                            className="w-full py-3 px-4 rounded-xl text-sm font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                          >
                            {connecting ? "Connecting..." : "1. Connect Channel"}
                          </button>
                        </div>

                        <div>
                          <label htmlFor="twitter" className="block text-sm font-bold text-gray-900 mb-2">
                            2. X (Twitter) Account <span className="text-gray-500 font-normal">(optional)</span>
                          </label>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-red-600 text-sm font-bold">
                              @
                            </span>
                            <input
                              type="text"
                              id="twitter"
                              value={twitterHandle}
                              onChange={(e) => setTwitterHandle(e.target.value.replace(/^@/, ""))}
                              placeholder="username"
                              className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="flex items-start space-x-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={isAnonymous}
                              onChange={(e) => setIsAnonymous(e.target.checked)}
                              className="mt-1 w-5 h-5 text-red-600 border-gray-400 rounded focus:ring-red-500 cursor-pointer"
                            />
                            <div>
                              <div className="font-bold text-gray-900 text-sm group-hover:text-red-600 transition-colors">
                                3. Hide Channel Name
                              </div>
                              <div className="text-xs text-gray-600 font-medium">
                                Your channel will appear as "Anonymous"
                              </div>
                            </div>
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Channel Name
                </th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {channels.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="text-6xl">📊</div>
                      <p className="text-gray-700 text-lg font-bold">No channels connected yet</p>
                      <p className="text-gray-600 text-sm font-medium">Click "Add Channel" to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                channels.map((channel, index) => (
                  <tr key={channel.id} className="hover:bg-red-50 transition-all duration-200 group">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {index === 0 ? (
                          <span className="text-2xl">🥇</span>
                        ) : index === 1 ? (
                          <span className="text-2xl">🥈</span>
                        ) : index === 2 ? (
                          <span className="text-2xl">🥉</span>
                        ) : (
                          <div className="text-lg font-semibold text-gray-700">
                            {index + 1}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-base font-normal text-gray-900 group-hover:text-red-600 transition-colors">
                        {channel.isAnonymous ? "Anonymous" : channel.channelName}
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      {channel.twitterHandle ? (
                        <a
                          href={`https://twitter.com/${channel.twitterHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-normal text-red-600 hover:text-red-700 hover:underline transition-colors"
                        >
                          @{channel.twitterHandle}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500 font-normal">-</span>
                      )}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="text-lg font-normal text-green-600">
                        {formatRevenue(channel.revenue)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
