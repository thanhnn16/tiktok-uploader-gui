"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Clock, CheckCircle, XCircle, Calendar, BarChart3, ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your TikTok uploads</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/upload">
              <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90 text-white">
                <Plus size={18} className="mr-2" />
                Upload New Video
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Uploads" value="24" change="+3 this week" icon={<Upload className="h-5 w-5" />} />
          <StatsCard
            title="Scheduled"
            value="5"
            change="Next: Today, 5:30 PM"
            icon={<Calendar className="h-5 w-5" />}
          />
          <StatsCard
            title="Success Rate"
            value="92%"
            change="+5% from last week"
            icon={<BarChart3 className="h-5 w-5" />}
          />
        </div>

        <Tabs defaultValue="recent" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos
                .filter((v) => v.status === "success")
                .map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} variants={itemVariants} />
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="scheduled">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos
                .filter((v) => v.status === "pending")
                .map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} variants={itemVariants} />
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="failed">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos
                .filter((v) => v.status === "failed")
                .map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} variants={itemVariants} />
                ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Define the StatsCard component
function StatsCard({ title, value, change, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <h3 className="text-3xl font-bold mt-1">{value}</h3>
              <p className="text-xs text-gray-500 mt-1">{change}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#4B0082]/10 flex items-center justify-center text-[#4B0082]">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Define the VideoCard component
function VideoCard({ video, index, variants }) {
  return (
    <motion.div variants={variants} className="h-full">
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video bg-gray-100">
          <img
            src={video.thumbnail || "/placeholder.svg?height=200&width=350"}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2">
            <Badge
              className={`
              ${
                video.status === "success" ? "bg-green-500" : video.status === "pending" ? "bg-amber-500" : "bg-red-500"
              } 
              text-white
            `}
            >
              {video.status === "success" ? (
                <CheckCircle size={14} className="mr-1" />
              ) : video.status === "pending" ? (
                <Clock size={14} className="mr-1" />
              ) : (
                <XCircle size={14} className="mr-1" />
              )}
              {video.status === "success" ? "Published" : video.status === "pending" ? "Scheduled" : "Failed"}
            </Badge>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <div className="text-xs text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              {video.date}
            </div>
            <Button variant="ghost" size="sm" className="text-[#4B0082]">
              View Details
              <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Sample data
const videos = [
  {
    id: 1,
    title: "Summer Dance Challenge",
    description: "Check out this new dance trend! #dance #summer #viral",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "Cooking Tutorial: Easy Pasta",
    description: "Learn how to make delicious pasta in under 10 minutes! #cooking #pasta #quickrecipes",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "pending",
    date: "Scheduled for tomorrow",
  },
  {
    id: 3,
    title: "My Morning Routine",
    description: "Here's how I start my productive days. #productivity #morning #routine",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "failed",
    date: "Failed 3 days ago",
  },
  {
    id: 4,
    title: "Travel Vlog: Paris",
    description: "Exploring the beautiful streets of Paris! #travel #paris #vlog",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "1 week ago",
  },
  {
    id: 5,
    title: "Makeup Tutorial: Summer Look",
    description: "Perfect makeup for hot summer days! #makeup #beauty #summer",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "success",
    date: "2 weeks ago",
  },
  {
    id: 6,
    title: "Workout Routine at Home",
    description: "No equipment needed for this effective workout! #fitness #workout #homeworkout",
    thumbnail: "/placeholder.svg?height=200&width=350",
    status: "pending",
    date: "Scheduled for next week",
  },
]
