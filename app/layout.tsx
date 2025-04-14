import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppNavbar } from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TikTok Uploader GUI",
  description: "A GUI for the TikTok Uploader library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AppNavbar />
          <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
            {children}
          </main>
          <footer className="w-full flex items-center justify-center py-3">
            {/* Footer content can be added later */}
          </footer>
        </Providers>
      </body>
    </html>
  );
}
