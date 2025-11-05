# YTrust - YouTube Revenue Leaderboard

A transparent platform for YouTube creators to share and compare their revenue data.

## Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with YouTube account
- 📊 **Live Leaderboard** - Real-time rankings based on revenue
- 💰 **Revenue Analytics** - Direct integration with YouTube Analytics API
- 🎭 **Anonymous Mode** - Option to hide your channel name
- 🐦 **X Integration** - Link your Twitter/X account
- 🎨 **YouTube Design** - Familiar red theme and modern UI

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - YouTube Data API v3
   - YouTube Analytics API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen:
   - User Type: External
   - Scopes: Add `https://www.googleapis.com/auth/yt-analytics.readonly`
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret

### 2. Environment Variables

Update `.env.local` with your credentials:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

To generate `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **NextAuth.js** - Authentication with Google OAuth
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google APIs** - YouTube Data & Analytics API
- **Lucide React** - Icons

## Project Structure

```
ytrust/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth configuration
│   │   ├── channels/route.ts            # Get all channels
│   │   └── connect/route.ts             # Connect YouTube channel
│   ├── connect/page.tsx                 # Channel connection form
│   ├── dashboard/page.tsx               # Leaderboard page
│   ├── page.tsx                         # Landing page
│   ├── layout.tsx                       # Root layout
│   └── providers.tsx                    # SessionProvider wrapper
├── components/                          # Reusable components
├── lib/
│   ├── db.ts                           # Database functions (JSON storage)
│   └── utils.ts                        # Utility functions
├── types/
│   ├── index.ts                        # TypeScript interfaces
│   └── next-auth.d.ts                  # NextAuth type extensions
└── data/
    └── channels.json                   # Channel data storage
```

## How It Works

1. **Sign In** - Users authenticate with Google OAuth
2. **Grant Permissions** - Authorize YouTube Analytics API access
3. **Fetch Revenue** - App retrieves revenue data from last 28 days
4. **Save Channel** - Store channel info with optional Twitter handle and anonymous mode
5. **Display Leaderboard** - Rank channels by revenue in real-time

## Database

Currently uses JSON file storage (`data/channels.json`) for simplicity. For production, migrate to:
- PostgreSQL
- MongoDB
- Supabase
- Firebase

## API Endpoints

### GET `/api/channels`
Returns all channels sorted by revenue (descending)

### POST `/api/connect`
Connects a YouTube channel
- Body: `{ twitterHandle?: string, isAnonymous: boolean }`
- Returns: Channel data with revenue

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT

