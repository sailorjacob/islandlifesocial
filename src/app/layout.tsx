import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Island Life Social - Social Media Management",
  description: "Modern social media post management and moodboarding for Island Life Hostel",
  keywords: ["social media", "content management", "moodboard", "island life", "hostel"],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <Providers>
          <div className="min-h-screen">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
