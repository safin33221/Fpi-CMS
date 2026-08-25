import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fpi-cms.vercel.app"),

  title: {
    default: "FPI CMS — Feni Polytechnic Institute",
    template: "%s | FPI CMS",
  },

  description:
    "FPI CMS is a smart campus management system for Feni Polytechnic Institute, providing student management, academic administration, QR-based attendance, and centralized campus operations.",

  applicationName: "FPI CMS",

  keywords: [
    "FPI CMS",
    "Feni Polytechnic Institute",
    "Feni Polytechnic",
    "FPI",
    "Campus Management System",
    "Smart Campus",
    "Student Management System",
    "Academic Management System",
    "QR Attendance",
    "Student Attendance",
    "Polytechnic Management System",
  ],

  authors: [
    {
      name: "Team Nexus",
    },
  ],

  creator: "Team Nexus",
  publisher: "Feni Polytechnic Institute",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "FPI CMS",
    title: "FPI CMS — Feni Polytechnic Institute",
    description:
      "Smart campus management system for Feni Polytechnic Institute with student management, academic administration, and QR-based attendance.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FPI CMS — Feni Polytechnic Institute",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FPI CMS — Feni Polytechnic Institute",
    description:
      "Smart campus management system for Feni Polytechnic Institute with student management, academic administration, and QR-based attendance.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "education",
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
        "h-full bg-white text-neutral-950",
        geistSans.variable,
        geistMono.variable,
        "font-serif",
        robotoSlab.variable
      )}
      style={{ colorScheme: "light" }}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-neutral-950"
      >
        {children}

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}