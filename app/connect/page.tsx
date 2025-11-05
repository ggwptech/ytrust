"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Play, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConnectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [twitterHandle, setTwitterHandle] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

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

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-red-600 p-3 rounded-lg">
              <Play className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Connect Your Channel</h1>
              <p className="text-gray-600">Join the YTrust leaderboard</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleConnect} className="space-y-6">
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Stay Anonymous</div>
                  <div className="text-sm text-gray-600">
                    Your channel name will be hidden on the leaderboard
                  </div>
                </div>
              </label>
            </div>

            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                X (Twitter) Account <span className="text-gray-400">(optional)</span>
              </label>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                  @
                </span>
                <input
                  type="text"
                  id="twitter"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value.replace(/^@/, ""))}
                  placeholder="username"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Share your X account to connect with other creators
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-full font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connecting..." : "Connect Channel"}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By connecting, you authorize YTrust to access your YouTube Analytics data
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
