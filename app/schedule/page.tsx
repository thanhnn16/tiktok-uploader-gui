"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, CalendarIcon, Clock, Edit, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-[#F4F4F9] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" className="mb-6 text-[#4B0082]" onClick={() => window.history.back()}>
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Schedule Manager</h1>
            <p className="text-gray-600">Manage your scheduled TikTok uploads</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/upload">
              <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white">
                <Plus size={18} className="mr-2" />
                Schedule New Upload
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2" size={20} />
                Calendar
              </CardTitle>
              <CardDescription>Select a date to view scheduled uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

              <div className="mt-6">
                <h3 className="font-medium mb-2">Upcoming Schedule</h3>
                <div className="space-y-2">
                  {upcomingDates.map((item) => (
                    <div
                      key={item.date}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => setDate(new Date(item.date))}
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#4B0082] mr-2"></div>
                        <span>{item.date}</span>
                      </div>
                      <Badge variant="outline">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2" size={20} />
                  Scheduled Videos
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft size={16} />
                  </Button>
                  <span className="text-sm font-normal">
                    {date ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                  </span>
                  <Button variant="outline" size="icon">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Videos scheduled for upload on the selected date</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Video</TableHead>
                      <TableHead>Caption</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledVideos.map((video, index) => (
                      <motion.tr key={video.id} variants={itemVariants} className="hover:bg-gray-100">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden">
                              <img
                                src={`/placeholder.svg?height=48&width=48`}
                                alt={video.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="font-medium">{video.title}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <div className="truncate">{video.description}</div>
                        </TableCell>
                        <TableCell>{video.time}</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-500 text-white">
                            <Clock size={12} className="mr-1" />
                            Scheduled
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Sample data
const upcomingDates = [
  { date: "Today", count: 2 },
  { date: "Tomorrow", count: 3 },
  { date: "May 20, 2025", count: 1 },
  { date: "May 22, 2025", count: 4 },
  { date: "May 25, 2025", count: 2 },
]

const scheduledVideos = [
  {
    id: 1,
    title: "Summer Dance Challenge",
    description: "Check out this new dance trend! #dance #summer #viral",
    time: "10:30 AM",
  },
  {
    id: 2,
    title: "Cooking Tutorial: Easy Pasta",
    description: "Learn how to make delicious pasta in under 10 minutes! #cooking #pasta #quickrecipes",
    time: "2:15 PM",
  },
  {
    id: 3,
    title: "Travel Vlog: Paris",
    description: "Exploring the beautiful streets of Paris! #travel #paris #vlog",
    time: "5:45 PM",
  },
]
