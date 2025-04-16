"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Upload, Settings, Users, Calendar, History, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Upload, label: "Upload", href: "/upload" },
    { icon: Calendar, label: "Schedule", href: "/schedule" },
    { icon: History, label: "History", href: "/history" },
    { icon: Users, label: "Accounts", href: "/accounts" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ]

  return (
    <motion.div
      className="hidden md:flex flex-col h-screen bg-gradient-to-br from-[#4B0082] to-[#8A2BE2] text-white fixed top-0 left-0 z-50"
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full relative">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <div className="p-4">
            <div className="mb-8">
              <h1
                className={`text-xl font-bold transition-opacity duration-200 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
              >
                TikTok Uploader
              </h1>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start px-3 py-2 ${
                      pathname === item.href ? "bg-white/20 hover:bg-white/30" : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon size={20} className={isCollapsed ? "mx-auto" : "mr-3"} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-white/20 shrink-0">
          <div className="flex items-center gap-3">
            <Avatar>
              <div className="w-full h-full rounded-full bg-[#00BFA6] flex items-center justify-center">
                <span className="text-sm font-bold">TN</span>
              </div>
            </Avatar>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="font-medium truncate">Thanh Nong</p>
                <p className="text-xs text-white/70 truncate">@thanhnn16</p>
              </div>
            )}
          </div>
        </div>

        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 ${isCollapsed ? 'left-[calc(80px-16px)]' : 'left-[calc(240px-16px)]'} transition-all duration-300`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/30 hover:bg-white/40 text-white w-8 h-8 flex items-center justify-center shadow-md"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
