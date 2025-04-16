"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Upload, Settings, Users, Calendar, History, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Avatar } from "@/components/ui/avatar"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export default function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Upload, label: "Upload", href: "/upload" },
    { icon: Calendar, label: "Schedule", href: "/schedule" },
    { icon: History, label: "History", href: "/history" },
    { icon: Users, label: "Accounts", href: "/accounts" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-[#4B0082] to-[#8A2BE2] text-white p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">TikTok Uploader</h1>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-gradient-to-br from-[#4B0082] to-[#8A2BE2] text-white">
              <VisuallyHidden>
                <SheetTitle>Mobile Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-white/20">
                  <h1 className="text-xl font-bold">TikTok Uploader</h1>
                </div>

                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start ${
                            pathname === item.href ? "bg-white/20 hover:bg-white/30" : "hover:bg-white/10"
                          }`}
                        >
                          <item.icon size={20} className="mr-3" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </nav>

                <div className="p-4 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <div className="w-full h-full rounded-full bg-[#00BFA6] flex items-center justify-center">
                        <span className="text-sm font-bold">TN</span>
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium">Thanh Nong Nguyen</p>
                      <p className="text-xs text-white/70">@thanhnn16</p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`flex flex-col items-center py-3 h-auto ${
                  pathname === item.href ? "text-[#4B0082]" : "text-gray-500"
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
