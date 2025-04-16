import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TikTok Uploader",
  description: "A Selenium-based automated TikTok video uploader",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col md:flex-row min-h-screen max-w-full overflow-hidden bg-[#F4F4F9]">
            <Sidebar />
            <div className="flex-1 flex flex-col w-full overflow-hidden md:ml-[240px]">
              <MobileNav />
              <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-0 pb-16 md:pb-0">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'