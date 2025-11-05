export interface Channel {
  id: string
  userId: string
  channelId: string
  channelName: string
  isAnonymous: boolean
  twitterHandle?: string
  revenue: number
  lastUpdated: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  channels: Channel[]
}
