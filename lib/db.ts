import { Channel } from "@/types"
import fs from "fs/promises"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "channels.json")

export async function getAllChannels(): Promise<Channel[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

export async function saveChannel(channel: Channel): Promise<void> {
  const channels = await getAllChannels()
  const existingIndex = channels.findIndex(c => c.channelId === channel.channelId)
  
  if (existingIndex >= 0) {
    channels[existingIndex] = channel
  } else {
    channels.push(channel)
  }
  
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(channels, null, 2))
}

export async function getChannelsByUserId(userId: string): Promise<Channel[]> {
  const channels = await getAllChannels()
  return channels.filter(c => c.userId === userId)
}
