"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import {
  Upload,
  ArrowLeft,
  Hash,
  Clock,
  Globe,
  MessageSquare,
  Repeat,
  Scissors,
  CalendarIcon,
  AtSign,
  Info,
  AlertCircle,
  ShoppingBag,
  LinkIcon,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Trash2,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function UploadPage() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("12:00")
  const [isDragging, setIsDragging] = useState(false)
  const [videoSelected, setVideoSelected] = useState(false)
  const [uploadMode, setUploadMode] = useState("single")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const batchFileInputRef = useRef<HTMLInputElement>(null)

  // Privacy settings
  const [allowComments, setAllowComments] = useState(true)
  const [allowStitches, setAllowStitches] = useState(true)
  const [allowDuets, setAllowDuets] = useState(true)
  const [isPublic, setIsPublic] = useState(true)
  const [isScheduled, setIsScheduled] = useState(false)

  // Affiliate link
  const [productId, setProductId] = useState("")
  const [hasAffiliateLink, setHasAffiliateLink] = useState(false)
  const [affiliateLink, setAffiliateLink] = useState("")

  // Batch videos with individual properties
  const [batchVideos, setBatchVideos] = useState<
    Array<{
      id: string
      name: string
      size: string
      duration: string
      caption: string
      hashtags: string
      mentions: string
      productId: string
      expanded: boolean
    }>
  >([])

  // Common batch settings
  const [batchCaption, setBatchCaption] = useState("")
  const [batchHashtags, setBatchHashtags] = useState("")
  const [batchMentions, setBatchMentions] = useState("")
  const [batchProductId, setBatchProductId] = useState("")
  const [applyToAll, setApplyToAll] = useState(true)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (uploadMode === "single") {
      setVideoSelected(true)
      // In a real app, you would handle the file here
    } else {
      // Handle batch upload drop
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleBatchFiles(e.dataTransfer.files)
      }
    }
  }

  const handleFileSelect = () => {
    if (uploadMode === "single" && fileInputRef.current) {
      fileInputRef.current.click()
    } else if (uploadMode === "batch" && batchFileInputRef.current) {
      batchFileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (uploadMode === "single") {
        setVideoSelected(true)
        // In a real app, you would handle the file selection here
      } else {
        // Handle batch upload
        handleBatchFiles(e.target.files)
      }
    }
  }

  const handleBatchFiles = (files: FileList) => {
    const newVideos = Array.from(files)
      .filter((file) => file.type.startsWith("video/"))
      .map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        duration: "00:30", // In a real app, you would calculate this
        caption: batchCaption.replace("{index}", (batchVideos.length + 1).toString()),
        hashtags: batchHashtags,
        mentions: batchMentions,
        productId: batchProductId,
        expanded: false,
      }))

    setBatchVideos([...batchVideos, ...newVideos])

    if (newVideos.length > 0) {
      setVideoSelected(true)
    }
  }

  const removeFromBatch = (id: string) => {
    setBatchVideos(batchVideos.filter((video) => video.id !== id))
    if (batchVideos.length <= 1) {
      setVideoSelected(false)
    }
  }

  const toggleVideoExpand = (id: string) => {
    setBatchVideos(batchVideos.map((video) => (video.id === id ? { ...video, expanded: !video.expanded } : video)))
  }

  const updateBatchVideo = (id: string, field: string, value: string) => {
    setBatchVideos(batchVideos.map((video) => (video.id === id ? { ...video, [field]: value } : video)))
  }

  const applySettingsToAll = () => {
    setBatchVideos(
      batchVideos.map((video, index) => ({
        ...video,
        caption: batchCaption.replace("{index}", (index + 1).toString()),
        hashtags: batchHashtags,
        mentions: batchMentions,
        productId: batchProductId,
      })),
    )
  }

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value
    setProductId(id)

    if (id.trim()) {
      setHasAffiliateLink(true)
      // Generate affiliate link based on product ID
      setAffiliateLink(`https://example.com/affiliate/${id}`)
    } else {
      setHasAffiliateLink(false)
      setAffiliateLink("")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  // Reset video selection when switching modes
  const handleModeChange = (value: string) => {
    setUploadMode(value)
    setVideoSelected(false)
    if (value === "batch") {
      setBatchVideos([])
    }
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Upload Video</h1>
            <p className="text-gray-600">Upload videos to your TikTok account</p>
          </div>
        </div>

        <Tabs value={uploadMode} onValueChange={handleModeChange} className="mb-6">
          <TabsList>
            <TabsTrigger value="single">Single Video</TabsTrigger>
            <TabsTrigger value="batch">Batch Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="mt-4">
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Single Video Upload</AlertTitle>
              <AlertDescription>Upload one video at a time with custom settings.</AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="batch" className="mt-4">
            <Alert className="mb-6">
              <Info className="h-4 w-4" />
              <AlertTitle>Batch Upload</AlertTitle>
              <AlertDescription>
                Upload multiple videos at once. Each video can have its own settings or use common settings.
                <ul className="list-disc list-inside mt-2 text-sm">
                  <li>
                    You can use <code>{`{index}`}</code> in your caption to insert the video number
                  </li>
                  <li>Videos will be uploaded with a delay between each to avoid rate limits</li>
                  <li>Click on each video to customize its individual settings</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Step 1: Upload Video */}
          <motion.div variants={itemVariants}>
            <Card className={`border-2 ${step === 1 ? "border-[#4B0082]" : "border-gray-200"}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#4B0082] text-white flex items-center justify-center mr-3">
                    1
                  </div>
                  {uploadMode === "single" ? "Select Video" : "Select Videos"}
                </CardTitle>
                {uploadMode === "batch" && (
                  <CardDescription>Select multiple videos to upload in a batch</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {step === 1 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {/* Single Video Upload UI */}
                    {uploadMode === "single" && (
                      <motion.div
                        className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-[#00BFA6] bg-[#00BFA6]/5" : "border-gray-300"} ${videoSelected ? "bg-[#4B0082]/5 border-[#4B0082]" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        whileHover={{ boxShadow: "0 0 0 2px rgba(0, 191, 166, 0.3)" }}
                      >
                        {videoSelected ? (
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-[#4B0082]/20 rounded-full flex items-center justify-center mx-auto">
                              <Upload size={24} className="text-[#4B0082]" />
                            </div>
                            <h3 className="text-lg font-medium">video_example.mp4</h3>
                            <p className="text-gray-500">12.5 MB · 00:45</p>
                            <Button variant="outline" className="mt-2" onClick={() => setVideoSelected(false)}>
                              Change Video
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                              <Upload size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium">Drag & Drop your video here</h3>
                            <p className="text-gray-500">or</p>
                            <Button className="bg-[#4B0082] hover:bg-[#4B0082]/90" onClick={handleFileSelect}>
                              Browse Files
                            </Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="video/*"
                              onChange={handleFileChange}
                            />
                            <p className="text-xs text-gray-500 mt-3">
                              Supported formats: MP4, MOV, AVI
                              <br />
                              Maximum file size: 50MB
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Batch Upload UI */}
                    {uploadMode === "batch" && (
                      <div className="space-y-6">
                        {/* Batch upload area - only show if no videos selected */}
                        {batchVideos.length === 0 && (
                          <motion.div
                            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-[#00BFA6] bg-[#00BFA6]/5" : "border-gray-300"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            whileHover={{ boxShadow: "0 0 0 2px rgba(0, 191, 166, 0.3)" }}
                          >
                            <div className="space-y-3">
                              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                <Upload size={24} className="text-gray-400" />
                              </div>
                              <h3 className="text-lg font-medium">Drag & Drop multiple videos here</h3>
                              <p className="text-gray-500">or</p>
                              <Button className="bg-[#4B0082] hover:bg-[#4B0082]/90" onClick={handleFileSelect}>
                                Browse Files
                              </Button>
                              <input
                                type="file"
                                ref={batchFileInputRef}
                                className="hidden"
                                accept="video/*"
                                multiple
                                onChange={handleFileChange}
                              />
                              <p className="text-xs text-gray-500 mt-3">
                                Select multiple videos to upload in a batch
                                <br />
                                Supported formats: MP4, MOV, AVI
                              </p>
                            </div>
                          </motion.div>
                        )}

                        {/* Batch videos list */}
                        {batchVideos.length > 0 && (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">Selected Videos ({batchVideos.length})</h3>
                              <Button variant="outline" size="sm" className="text-[#4B0082]" onClick={handleFileSelect}>
                                <Upload size={14} className="mr-1" />
                                Add More Videos
                              </Button>
                              <input
                                type="file"
                                ref={batchFileInputRef}
                                className="hidden"
                                accept="video/*"
                                multiple
                                onChange={handleFileChange}
                              />
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                              {batchVideos.map((video) => (
                                <div key={video.id} className="border rounded-lg overflow-hidden bg-white">
                                  <div
                                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleVideoExpand(video.id)}
                                  >
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 bg-[#4B0082]/10 rounded-md flex items-center justify-center mr-3">
                                        <Play size={18} className="text-[#4B0082]" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-sm">{video.name}</p>
                                        <p className="text-xs text-gray-500">
                                          {video.size} · {video.duration}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-gray-500 hover:text-red-500"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          removeFromBatch(video.id)
                                        }}
                                      >
                                        <Trash2 size={16} />
                                      </Button>
                                      {video.expanded ? (
                                        <ChevronUp size={18} className="text-gray-500" />
                                      ) : (
                                        <ChevronDown size={18} className="text-gray-500" />
                                      )}
                                    </div>
                                  </div>

                                  {video.expanded && (
                                    <div className="p-3 border-t border-gray-100 bg-gray-50">
                                      <div className="space-y-3">
                                        <div>
                                          <Label htmlFor={`caption-${video.id}`} className="text-xs font-medium">
                                            Caption
                                          </Label>
                                          <Textarea
                                            id={`caption-${video.id}`}
                                            placeholder="Write a caption for this video..."
                                            className="resize-none h-16 mt-1 text-sm"
                                            value={video.caption}
                                            onChange={(e) => updateBatchVideo(video.id, "caption", e.target.value)}
                                          />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                          <div>
                                            <Label htmlFor={`hashtags-${video.id}`} className="text-xs font-medium">
                                              Hashtags
                                            </Label>
                                            <Input
                                              id={`hashtags-${video.id}`}
                                              placeholder="dance summer viral"
                                              className="mt-1 text-sm"
                                              value={video.hashtags}
                                              onChange={(e) => updateBatchVideo(video.id, "hashtags", e.target.value)}
                                            />
                                          </div>

                                          <div>
                                            <Label htmlFor={`mentions-${video.id}`} className="text-xs font-medium">
                                              Mentions
                                            </Label>
                                            <Input
                                              id={`mentions-${video.id}`}
                                              placeholder="username1 username2"
                                              className="mt-1 text-sm"
                                              value={video.mentions}
                                              onChange={(e) => updateBatchVideo(video.id, "mentions", e.target.value)}
                                            />
                                          </div>
                                        </div>

                                        <div>
                                          <Label htmlFor={`productId-${video.id}`} className="text-xs font-medium">
                                            Product ID (Affiliate)
                                          </Label>
                                          <Input
                                            id={`productId-${video.id}`}
                                            placeholder="Enter product ID (e.g. 12345)"
                                            className="mt-1 text-sm"
                                            value={video.productId}
                                            onChange={(e) => updateBatchVideo(video.id, "productId", e.target.value)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Common settings for all videos */}
                            <Card className="mt-6">
                              <CardHeader className="py-3">
                                <CardTitle className="text-base">Common Settings</CardTitle>
                                <CardDescription>Apply these settings to all videos in the batch</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <Label htmlFor="batch-caption">Caption Template</Label>
                                  <Textarea
                                    id="batch-caption"
                                    placeholder="Write a caption template. Use {index} to insert video number."
                                    className="resize-none h-16 mt-1"
                                    value={batchCaption}
                                    onChange={(e) => setBatchCaption(e.target.value)}
                                  />
                                  <p className="text-xs text-gray-500 mt-1">
                                    Example: "Check out my video #{"{index}"} in this series! #viral"
                                  </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="batch-hashtags">Common Hashtags</Label>
                                    <Input
                                      id="batch-hashtags"
                                      placeholder="dance summer viral"
                                      value={batchHashtags}
                                      onChange={(e) => setBatchHashtags(e.target.value)}
                                    />
                                  </div>

                                  <div>
                                    <Label htmlFor="batch-mentions">Common Mentions</Label>
                                    <Input
                                      id="batch-mentions"
                                      placeholder="username1 username2"
                                      value={batchMentions}
                                      onChange={(e) => setBatchMentions(e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="batch-productId">Common Product ID</Label>
                                  <Input
                                    id="batch-productId"
                                    placeholder="Enter product ID for all videos"
                                    value={batchProductId}
                                    onChange={(e) => setBatchProductId(e.target.value)}
                                  />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center space-x-2">
                                    <Label htmlFor="apply-to-all">Apply to all videos</Label>
                                  </div>
                                  <Switch id="apply-to-all" checked={applyToAll} onCheckedChange={setApplyToAll} />
                                </div>

                                <Button
                                  className="w-full bg-[#4B0082] hover:bg-[#4B0082]/90"
                                  onClick={applySettingsToAll}
                                >
                                  Apply Settings to All Videos
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </div>
                    )}

                    {videoSelected && (
                      <div className="mt-6 flex justify-end">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90" onClick={() => setStep(2)}>
                            Continue
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">✓</span>
                    {uploadMode === "single" ? (
                      <span>video_example.mp4 selected</span>
                    ) : (
                      <span>{batchVideos.length} videos selected</span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Step 2: Video Details - Only show for single upload */}
          {uploadMode === "single" && (
            <motion.div variants={itemVariants}>
              <Card
                className={`border-2 ${step === 2 ? "border-[#4B0082]" : "border-gray-200"} ${step < 2 ? "opacity-60" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#4B0082] text-white flex items-center justify-center mr-3">
                      2
                    </div>
                    Video Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {step === 2 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="space-y-3">
                        <Label htmlFor="caption">Caption</Label>
                        <Textarea
                          id="caption"
                          placeholder="Write an engaging caption for your video..."
                          className="resize-none h-24"
                        />
                        <p className="text-xs text-gray-500 text-right">0/150</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="hashtags">Hashtags</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={14} className="text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">
                                  Add hashtags to increase visibility. Separate with spaces.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="relative">
                          <Hash className="absolute left-3 top-3 text-gray-400" size={16} />
                          <Input id="hashtags" placeholder="dance summer viral" className="pl-9" />
                        </div>
                        <p className="text-xs text-gray-500">Separate hashtags with spaces (e.g. dance summer viral)</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="mentions">Mentions</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={14} className="text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">
                                  Tag other TikTok users. Make sure the accounts exist.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-3 text-gray-400" size={16} />
                          <Input id="mentions" placeholder="username1 username2" className="pl-9" />
                        </div>
                        <p className="text-xs text-gray-500">
                          Separate usernames with spaces (e.g. username1 username2)
                        </p>
                      </div>

                      {/* New Affiliate Link Section */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="productId">Product ID (Affiliate)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={14} className="text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-[200px] text-xs">
                                  Enter a product ID to automatically generate an affiliate link for your video.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="relative">
                          <ShoppingBag className="absolute left-3 top-3 text-gray-400" size={16} />
                          <Input id="productId" size={16} />
                          <Input
                            id="productId"
                            placeholder="Enter product ID (e.g. 12345)"
                            className="pl-9"
                            value={productId}
                            onChange={handleProductIdChange}
                          />
                        </div>

                        {hasAffiliateLink && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="flex items-center gap-2 p-3 rounded-md bg-[#4B0082]/5 border border-[#4B0082]/20"
                          >
                            <Check size={16} className="text-green-500 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Affiliate link generated:</p>
                              <div className="flex items-center gap-1 mt-1">
                                <LinkIcon size={12} className="text-gray-500" />
                                <p className="text-xs text-gray-600 truncate">{affiliateLink}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <p className="text-xs text-gray-500">
                          This will add an affiliate link to your video description
                        </p>
                      </div>

                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90" onClick={() => setStep(3)}>
                          Continue
                        </Button>
                      </div>
                    </motion.div>
                  ) : step > 2 ? (
                    <div className="flex items-center text-gray-500">
                      <span className="mr-2">✓</span>
                      <span>Caption and hashtags added</span>
                      {hasAffiliateLink && <span className="ml-2 text-xs text-[#4B0082]">• Affiliate link added</span>}
                    </div>
                  ) : (
                    <div className="text-gray-400">Add caption and hashtags to your video</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Publishing Options */}
          <motion.div variants={itemVariants}>
            <Card
              className={`border-2 ${step === (uploadMode === "single" ? 3 : 2) ? "border-[#4B0082]" : "border-gray-200"} ${step < (uploadMode === "single" ? 3 : 2) ? "opacity-60" : ""}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#4B0082] text-white flex items-center justify-center mr-3">
                    {uploadMode === "single" ? "3" : "2"}
                  </div>
                  Publishing Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === (uploadMode === "single" ? 3 : 2) ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe size={18} />
                          <Label htmlFor="privacy">Privacy</Label>
                        </div>
                        <Switch id="privacy" checked={isPublic} onCheckedChange={setIsPublic} />
                      </div>
                      <p className="text-xs text-gray-500 ml-7 mt-1">
                        {isPublic ? "Your video will be visible to everyone" : "Your video will only be visible to you"}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageSquare size={18} />
                          <Label htmlFor="comments">Allow Comments</Label>
                        </div>
                        <Switch id="comments" checked={allowComments} onCheckedChange={setAllowComments} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Scissors size={18} />
                          <Label htmlFor="stitch">Allow Stitch</Label>
                        </div>
                        <Switch id="stitch" checked={allowStitches} onCheckedChange={setAllowStitches} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Repeat size={18} />
                          <Label htmlFor="duet">Allow Duet</Label>
                        </div>
                        <Switch id="duet" checked={allowDuets} onCheckedChange={setAllowDuets} />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                          <Clock size={18} />
                          <Label htmlFor="schedule">Schedule Post</Label>
                        </div>
                        <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                      </div>

                      {isScheduled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 pt-2 pl-7"
                        >
                          <Alert variant="destructive" className="bg-amber-50 text-amber-800 border-amber-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Scheduling Requirements</AlertTitle>
                            <AlertDescription className="text-xs">
                              Scheduled time must be at least 20 minutes in the future and within 10 days.
                            </AlertDescription>
                          </Alert>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm text-gray-500 mb-1 block">Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-500 mb-1 block">Time</Label>
                              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {uploadMode === "batch" && (
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <h3 className="font-medium">Batch Upload Settings</h3>

                        <div className="space-y-2">
                          <Label htmlFor="delay-between">Delay Between Uploads (seconds)</Label>
                          <Input id="delay-between" type="number" min="30" max="3600" defaultValue="60" />
                          <p className="text-xs text-gray-500">
                            Adding a delay between uploads helps avoid rate limiting
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="stop-on-error">Stop on Error</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info size={14} className="text-gray-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-[200px] text-xs">
                                    If enabled, the batch upload will stop if any video fails to upload.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Switch id="stop-on-error" defaultChecked />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => setStep(uploadMode === "single" ? 2 : 1)}>
                        Back
                      </Button>
                      <div className="space-x-3">
                        {isScheduled ? (
                          <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90">
                            {uploadMode === "single" ? "Schedule Upload" : `Schedule ${batchVideos.length} Videos`}
                          </Button>
                        ) : (
                          <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90">
                            {uploadMode === "single" ? "Upload Now" : `Upload ${batchVideos.length} Videos Now`}
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-gray-400">Set privacy and scheduling options</div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
