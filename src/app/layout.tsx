import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const robotoSlab = Roboto_Slab({ subsets: ['latin'], variable: '--font-serif' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FPI CMS",
    template: "%s | FPI CMS",
  },
  description:
    "Smart Campus Management System for Feni Polytechnic Institute with QR-based attendance, academic management, and centralized administration.",
  keywords: [
    "FPI CMS",
    "Feni Polytechnic Institute",
    "Smart Campus",
    "Campus Management System",
    "QR Attendance",
    "Student Management",
    "Academic Management",
  ],
  authors: [
    {
      name: "Team Nexus",
    },
  ],
  creator: "Team Nexus",
  metadataBase: new URL("https://fpi-cms.vercel.app"),
  openGraph: {
    title: "FPI CMS",
    description:
      "Smart Campus Management System for Feni Polytechnic Institute.",
    siteName: "FPI CMS",
    locale: "en_US",
    type: "website",
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
      className={cn(
        "h-full bg-white text-neutral-950 antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-serif",
        robotoSlab.variable
      )}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-950">
        {children}
      </body>
    </html>
  );
}
