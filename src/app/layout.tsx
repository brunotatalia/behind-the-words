import type { Metadata, Viewport } from "next";
import { Heebo, Inter } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "מאחורי המילים | Behind The Words",
  description: "משחק טריוויה שחושף את המשמעות האמיתית מאחורי השירים שאתם שומעים כל יום",
  metadataBase: new URL("https://www.behind-the-words.com"),
  openGraph: {
    title: "מאחורי המילים | Behind The Words",
    description: "?מה באמת מסתתר מאחורי השירים שאתם שומעים כל יום",
    siteName: "Behind The Words",
    locale: "he_IL",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "מאחורי המילים",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
