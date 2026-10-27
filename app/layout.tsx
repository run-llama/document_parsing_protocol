import type { Metadata } from "next";
import type React from "react";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parseprotocol.com"),
  title: "Document Parsing Protocol (DPP)",
  description:
    "A protocol for how to make truthful and AI-friendly interpretation of documents.",
  applicationName: "Document Parsing Protocol",
  openGraph: { type: "website", siteName: "Document Parsing Protocol" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
