import type { Metadata } from "next";
import { spaceMono } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kusanagi no Tsurugi",
  description: "A legendary sword minted as a Solana meme coin. Inspired by Japanese mythology.",
  keywords: "Solana, meme coin, cryptocurrency, Japanese mythology, Kusanagi",
  authors: [{ name: "Kusanagi Team" }],
  openGraph: {
    title: "Kusanagi no Tsurugi",
    description: "A legendary sword minted as a Solana meme coin. Inspired by Japanese mythology.",
    type: "website",
    url: "https://kusanagi-nagi.com",
  },
  icons: {
    icon: '/images/main-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-mono bg-cream text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
