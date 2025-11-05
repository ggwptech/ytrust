import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { google } from "googleapis"
import { saveChannel } from "@/lib/db"
import type { Channel } from "@/types"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { twitterHandle, isAnonymous } = await req.json()

    // Initialize OAuth2 client with credentials
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
    )
    
    oauth2Client.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    })

    // Get YouTube channel info
    const youtube = google.youtube({ version: "v3", auth: oauth2Client })
    const channelResponse = await youtube.channels.list({
      part: ["snippet"],
      mine: true,
    })

    const channelData = channelResponse.data.items?.[0]
    if (!channelData) {
      return NextResponse.json(
        { error: "No YouTube channel found" },
        { status: 404 }
      )
    }

    const channelId = channelData.id!
    const channelName = channelData.snippet?.title || "Unknown Channel"

    // Get revenue from YouTube Analytics
    const youtubeAnalytics = google.youtubeAnalytics({ version: "v2", auth: oauth2Client })
    
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 28) // Last 28 days

    let revenue = 0
    try {
      const analyticsResponse = await youtubeAnalytics.reports.query({
        ids: `channel==${channelId}`,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        metrics: "estimatedRevenue",
        dimensions: "day",
      })

      const rows = analyticsResponse.data.rows || []
      revenue = rows.reduce((sum, row) => sum + (row[1] as number || 0), 0)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      // If analytics fails, use a placeholder value
      revenue = 0
    }

    // Save to database
    const channel: Channel = {
      id: channelId,
      userId: session.user.email,
      channelId,
      channelName,
      isAnonymous,
      twitterHandle: twitterHandle || undefined,
      revenue,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    await saveChannel(channel)

    return NextResponse.json({ success: true, channel })
  } catch (error) {
    console.error("Error connecting channel:", error)
    return NextResponse.json(
      { error: "Failed to connect channel" },
      { status: 500 }
    )
  }
}
