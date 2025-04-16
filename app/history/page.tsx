"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, CheckCircle, XCircle, Clock, Search, Calendar, ArrowUpDown, ExternalLink } from "lucide-react"

export default function HistoryPage() {
  const [period, setPeriod] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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

  // Filter videos based on search query and status
  const filteredVideos = uploadHistory.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || video.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#F4F4F9] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" className="mb-6 text-[#4B0082]" onClick={() => window.history.back()}>
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Upload History</h1>
            <p className="text-gray-600">View and manage your past TikTok uploads</p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Uploads</CardTitle>
            <CardDescription>Search and filter your upload history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                <Input
                  placeholder="Search by title or description"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Published</SelectItem>
                  <SelectItem value="pending">Scheduled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Video</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Date
                            <ArrowUpDown size={14} className="ml-1" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Affiliate</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVideos.length > 0 ? (
                        filteredVideos.map((video, index) => (
                          <motion.tr key={video.id} variants={itemVariants} className="hover:bg-gray-100">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden">
                                  <img
                                    src={video.thumbnail || `/placeholder.svg?height=48&width=48`}
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
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-1 text-gray-500" />
                                {video.date}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`
                                ${
                                  video.status === "success"
                                    ? "bg-green-500"
                                    : video.status === "pending"
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                } 
                                text-white
                              `}
                              >
                                {video.status === "success" ? (
                                  <CheckCircle size={12} className="mr-1" />
                                ) : video.status === "pending" ? (
                                  <Clock size={12} className="mr-1" />
                                ) : (
                                  <XCircle size={12} className="mr-1" />
                                )}
                                {video.status === "success"
                                  ? "Published"
                                  : video.status === "pending"
                                    ? "Scheduled"
                                    : "Failed"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {video.affiliateLink ? (
                                <Badge variant="outline" className="bg-[#4B0082]/10 text-[#4B0082] border-[#4B0082]/20">
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-500">
                                  None
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {video.status === "success" && (
                                  <Button variant="outline" size="sm" className="h-8">
                                    <ExternalLink size={14} className="mr-1" />
                                    View on TikTok
                                  </Button>
                                )}
                                <Button variant="outline" size="sm" className="h-8">
                                  Reupload
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No videos found matching your filters
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12 text-gray-500">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Calendar View Coming Soon</h3>
                  <p>We're working on a calendar view to help you visualize your upload history.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Sample data
const uploadHistory = [
  {
    id: 1,
    title: "Summer Dance Challenge",
    description: "Check out this new dance trend! #dance #summer #viral",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "Apr 15, 2025",
    affiliateLink: "https://example.com/affiliate/12345",
  },
  {
    id: 2,
    title: "Cooking Tutorial: Easy Pasta",
    description: "Learn how to make delicious pasta in under 10 minutes! #cooking #pasta #quickrecipes",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "pending",
    date: "Apr 16, 2025",
    affiliateLink: null,
  },
  {
    id: 3,
    title: "My Morning Routine",
    description: "Here's how I start my productive days. #productivity #morning #routine",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "failed",
    date: "Apr 12, 2025",
    affiliateLink: null,
  },
  {
    id: 4,
    title: "Travel Vlog: Paris",
    description: "Exploring the beautiful streets of Paris! #travel #paris #vlog",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "Apr 8, 2025",
    affiliateLink: "https://example.com/affiliate/67890",
  },
  {
    id: 5,
    title: "Makeup Tutorial: Summer Look",
    description: "Perfect makeup for hot summer days! #makeup #beauty #summer",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "Apr 1, 2025",
    affiliateLink: "https://example.com/affiliate/54321",
  },
  {
    id: 6,
    title: "Workout Routine at Home",
    description: "No equipment needed for this effective workout! #fitness #workout #homeworkout",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "pending",
    date: "Apr 20, 2025",
    affiliateLink: null,
  },
  {
    id: 7,
    title: "Product Review: New Headphones",
    description: "Checking out these amazing new wireless headphones! #tech #review #headphones",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "Mar 28, 2025",
    affiliateLink: "https://example.com/affiliate/13579",
  },
  {
    id: 8,
    title: "Gaming Highlights: Fortnite",
    description: "My best plays from this week! #gaming #fortnite #highlights",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "Mar 25, 2025",
    affiliateLink: null,
  },
  {
    id: 9,
    title: "DIY Home Decor Ideas",
    description: "Easy and affordable ways to spruce up your living space! #diy #homedecor #budget",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "failed",
    date: "Mar 20, 2025",
    affiliateLink: "https://example.com/affiliate/24680",
  },
  {
    id: 10,
    title: "Day in My Life: College Student",
    description: "Follow me around campus for a day! #college #dayinmylife #student",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "Mar 15, 2025",
    affiliateLink: null,
  },
]
