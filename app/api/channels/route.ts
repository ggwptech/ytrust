import { NextResponse } from "next/server"
import { getAllChannels } from "@/lib/db"

export async function GET() {
  try {
    const channels = await getAllChannels()
    // Sort by revenue descending
    const sorted = channels.sort((a, b) => b.revenue - a.revenue)
    return NextResponse.json(sorted)
  } catch (error) {
    console.error("Error fetching channels:", error)
    return NextResponse.json(
      { error: "Failed to fetch channels" },
      { status: 500 }
    )
  }
}
