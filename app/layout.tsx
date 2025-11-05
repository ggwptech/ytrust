import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "YTrust - YouTube Revenue Leaderboard",
  description: "Discover top YouTube creators ranked by revenue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
