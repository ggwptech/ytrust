import { Channel } from "@/types"
import clientPromise from "./mongodb"

const DB_NAME = "ytrustdata"
const COLLECTION_NAME = "channels"

export async function getAllChannels(): Promise<Channel[]> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const channels = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ revenue: -1 })
      .toArray()
    
    return channels.map(doc => ({
      id: doc.id,
      userId: doc.userId,
      channelId: doc.channelId,
      channelName: doc.channelName,
      isAnonymous: doc.isAnonymous,
      twitterHandle: doc.twitterHandle,
      revenue: doc.revenue,
      lastUpdated: doc.lastUpdated,
      createdAt: doc.createdAt,
    }))
  } catch (error) {
    console.error("Failed to fetch channels:", error)
    return []
  }
}

export async function saveChannel(channel: Channel): Promise<void> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    
    await db.collection(COLLECTION_NAME).updateOne(
      { channelId: channel.channelId },
      { $set: channel },
      { upsert: true }
    )
  } catch (error) {
    console.error("Failed to save channel:", error)
    throw error
  }
}

export async function getChannelsByUserId(userId: string): Promise<Channel[]> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const channels = await db
      .collection(COLLECTION_NAME)
      .find({ userId })
      .toArray()
    
    return channels.map(doc => ({
      id: doc.id,
      userId: doc.userId,
      channelId: doc.channelId,
      channelName: doc.channelName,
      isAnonymous: doc.isAnonymous,
      twitterHandle: doc.twitterHandle,
      revenue: doc.revenue,
      lastUpdated: doc.lastUpdated,
      createdAt: doc.createdAt,
    }))
  } catch (error) {
    console.error("Failed to fetch user channels:", error)
    return []
  }
}
