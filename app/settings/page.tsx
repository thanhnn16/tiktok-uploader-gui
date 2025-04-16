"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Globe, Monitor, Cookie, Database, Shield, Download, HelpCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  const [cookieFile, setCookieFile] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [browser, setBrowser] = useState("chrome")

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
    setCookieFile("tiktok_cookies.txt")
    // In a real app, you would handle the file here
  }

  const handleFileSelect = () => {
    setCookieFile("tiktok_cookies.txt")
    // In a real app, you would handle the file selection here
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

        <h1 className="text-2xl md:text-3xl font-bold mb-2">Configuration</h1>
        <p className="text-gray-600 mb-8">Manage your TikTok uploader settings</p>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="account" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              Authentication
            </TabsTrigger>
            <TabsTrigger value="browser" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              Browser
            </TabsTrigger>
            <TabsTrigger value="proxy" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              Proxy
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              Advanced
            </TabsTrigger>
          </TabsList>

          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <TabsContent value="account">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Cookie className="mr-2" size={20} />
                      TikTok Authentication
                    </CardTitle>
                    <CardDescription>Upload your TikTok cookies file to authenticate with your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800">
                      <HelpCircle className="h-4 w-4" />
                      <AlertTitle>How to get your cookies</AlertTitle>
                      <AlertDescription>
                        <ol className="list-decimal list-inside text-sm space-y-1 mt-2">
                          <li>Install the "Get cookies.txt" or "EditThisCookie" browser extension</li>
                          <li>Log in to TikTok.com with your account</li>
                          <li>Click on the extension icon and export your cookies</li>
                          <li>Save the file and upload it here</li>
                          <li>Alternatively, you can use the session ID method below</li>
                        </ol>
                      </AlertDescription>
                    </Alert>

                    <motion.div
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${isDragging ? "border-[#00BFA6] bg-[#00BFA6]/5" : "border-gray-300"} ${cookieFile ? "bg-[#4B0082]/5 border-[#4B0082]" : ""}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      whileHover={{ boxShadow: "0 0 0 2px rgba(75, 0, 130, 0.3)" }}
                    >
                      {cookieFile ? (
                        <div className="space-y-3">
                          <div className="w-12 h-12 bg-[#4B0082]/20 rounded-full flex items-center justify-center mx-auto">
                            <Cookie size={20} className="text-[#4B0082]" />
                          </div>
                          <h3 className="text-lg font-medium">{cookieFile}</h3>
                          <p className="text-gray-500">Uploaded successfully</p>
                          <Button variant="outline" className="mt-2" onClick={() => setCookieFile(null)}>
                            Replace File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <Upload size={20} className="text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium">Drag & Drop your cookies file here</h3>
                          <p className="text-gray-500">or</p>
                          <Button className="bg-[#4B0082] hover:bg-[#4B0082]/90" onClick={handleFileSelect}>
                            Browse Files
                          </Button>
                          <p className="text-xs text-gray-500 mt-3">Supported format: TXT (Netscape cookies format)</p>
                        </div>
                      )}
                    </motion.div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Database size={18} />
                          <Label htmlFor="save-cookies">Save cookies locally</Label>
                        </div>
                        <Switch id="save-cookies" defaultChecked />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 ml-6">
                        Cookies will be encrypted and stored on your device
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium mb-4">Alternative: Session ID Authentication</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="session-id">TikTok Session ID (sessionid)</Label>
                          <Input id="session-id" placeholder="Enter your TikTok session ID" />
                          <p className="text-xs text-gray-500">
                            You can find this in your browser cookies after logging into TikTok
                          </p>
                        </div>
                        <Button className="bg-[#4B0082] hover:bg-[#4B0082]/90">Save Session ID</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="browser">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Monitor className="mr-2" size={20} />
                      Browser Settings
                    </CardTitle>
                    <CardDescription>Configure browser behavior for TikTok uploads</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="browser-select" className="block mb-2">
                          Browser Selection
                        </Label>
                        <Select value={browser} onValueChange={setBrowser}>
                          <SelectTrigger id="browser-select">
                            <SelectValue placeholder="Select browser" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chrome">Chrome (Recommended)</SelectItem>
                            <SelectItem value="firefox">Firefox</SelectItem>
                            <SelectItem value="edge">Edge</SelectItem>
                            <SelectItem value="safari">Safari</SelectItem>
                            <SelectItem value="chromium">Chromium</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">Chrome is recommended for best compatibility</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="headless-mode" className="block">
                            Headless Mode
                          </Label>
                          <p className="text-xs text-gray-500">Run browser without UI (faster)</p>
                        </div>
                        <Switch id="headless-mode" disabled={browser !== "chrome"} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="stealth-mode" className="block">
                            Stealth Mode
                          </Label>
                          <p className="text-xs text-gray-500">Avoid detection as automated browser</p>
                        </div>
                        <Switch id="stealth-mode" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="save-logs" className="block">
                            Save Browser Logs
                          </Label>
                          <p className="text-xs text-gray-500">Useful for debugging issues</p>
                        </div>
                        <Switch id="save-logs" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-agent">Custom User Agent (Optional)</Label>
                      <Input
                        id="user-agent"
                        placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
                      />
                      <p className="text-xs text-gray-500">Leave empty to use default</p>
                    </div>

                    <div className="pt-4">
                      <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90">Save Browser Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="proxy">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="mr-2" size={20} />
                      Proxy Settings
                    </CardTitle>
                    <CardDescription>Configure proxy settings to avoid rate limits and IP blocks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enable-proxy">Enable Proxy</Label>
                        <Switch id="enable-proxy" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="proxy-host">Proxy Host</Label>
                        <Input id="proxy-host" placeholder="127.0.0.1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="proxy-port">Proxy Port</Label>
                        <Input id="proxy-port" placeholder="8080" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="proxy-username">Username (Optional)</Label>
                        <Input id="proxy-username" placeholder="username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="proxy-password">Password (Optional)</Label>
                        <Input id="proxy-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90">Save Proxy Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="advanced">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2" size={20} />
                      Advanced Settings
                    </CardTitle>
                    <CardDescription>Configure advanced options for the TikTok uploader</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="auto-retry" className="block">
                            Auto-Retry Failed Uploads
                          </Label>
                          <p className="text-xs text-gray-500">Automatically retry failed uploads</p>
                        </div>
                        <Switch id="auto-retry" defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="retry-count">Maximum Retry Attempts</Label>
                        <Input id="retry-count" type="number" min="1" max="5" defaultValue="3" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="delay">Delay Between Uploads (seconds)</Label>
                        <Input id="delay" type="number" min="0" max="3600" defaultValue="30" />
                        <p className="text-xs text-gray-500">
                          Adding a delay between uploads can help avoid rate limiting
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download size={16} />
                        Export Settings
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload size={16} />
                        Import Settings
                      </Button>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full bg-[#00BFA6] hover:bg-[#00BFA6]/90">Save Advanced Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  )
}
