"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, HelpCircle, Book, MessageSquare, Github, ExternalLink, Users } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar } from "@/components/ui/avatar"

export default function HelpPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Help & Documentation</h1>
            <p className="text-gray-600">Learn how to use TikTok Uploader effectively</p>
          </div>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="faq" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              <Book className="mr-2 h-4 w-4" />
              Documentation
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Support
            </TabsTrigger>
            <TabsTrigger value="credits" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-white">
              <Users className="mr-2 h-4 w-4" />
              Credits
            </TabsTrigger>
          </TabsList>

          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <TabsContent value="faq">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Common questions about TikTok Uploader</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How does TikTok Uploader work?</AccordionTrigger>
                        <AccordionContent>
                          TikTok Uploader works by using Selenium to automate the upload process. It uses your browser's
                          cookies to authenticate with TikTok, which tricks TikTok into believing you are logged in on a
                          remote-controlled browser.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How do I get my TikTok cookies?</AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal list-inside space-y-2">
                            <li>Install the "Get cookies.txt" browser extension</li>
                            <li>Log in to TikTok.com</li>
                            <li>Click on the extension icon</li>
                            <li>Click "Export As ⇩" to save your cookies</li>
                            <li>Upload the cookies file in the Settings page</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Can I schedule multiple videos at once?</AccordionTrigger>
                        <AccordionContent>
                          Yes, you can use the Batch Upload feature to upload multiple videos at once. You can also
                          schedule them to be posted at different times.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Why did my upload fail?</AccordionTrigger>
                        <AccordionContent>
                          Uploads can fail for several reasons:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>TikTok's anti-bot measures detected the automation</li>
                            <li>Your cookies have expired</li>
                            <li>Your internet connection is unstable</li>
                            <li>You've uploaded too many videos in a short period</li>
                          </ul>
                          Try waiting a few hours before attempting to upload again.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                        <AccordionContent>
                          TikTok Uploader supports the following browsers:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Chrome (Recommended)</li>
                            <li>Firefox</li>
                            <li>Edge</li>
                            <li>Safari</li>
                            <li>Chromium</li>
                          </ul>
                          Chrome is recommended for the best compatibility and features.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-6">
                        <AccordionTrigger>Can I use a proxy with TikTok Uploader?</AccordionTrigger>
                        <AccordionContent>
                          Yes, you can configure proxy settings in the Settings page. This can help avoid rate limits
                          and IP blocks. Currently, proxy support works best with Chrome.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="docs">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Documentation</CardTitle>
                    <CardDescription>Learn how to use TikTok Uploader</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Learn the basics of TikTok Uploader and how to set it up.
                        </p>
                        <Button variant="outline" className="w-full">
                          Read Guide
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Authentication Guide</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Learn how to authenticate with TikTok using cookies.
                        </p>
                        <Button variant="outline" className="w-full">
                          Read Guide
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Advanced Features</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Learn about advanced features like proxies, scheduling, and batch uploads.
                        </p>
                        <Button variant="outline" className="w-full">
                          Read Guide
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Troubleshooting</h3>
                        <p className="text-sm text-gray-600 mb-4">Common issues and how to resolve them.</p>
                        <Button variant="outline" className="w-full">
                          Read Guide
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full bg-[#4B0082] hover:bg-[#4B0082]/90">
                        <Github size={18} className="mr-2" />
                        View GitHub Repository
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="support">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Support</CardTitle>
                    <CardDescription>Get help with TikTok Uploader</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">GitHub Issues</h3>
                        <p className="text-sm text-gray-600 mb-4">Report bugs or request features on GitHub.</p>
                        <Button variant="outline" className="w-full">
                          Open GitHub Issues
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Community Discussions</h3>
                        <p className="text-sm text-gray-600 mb-4">Join the community to discuss TikTok Uploader.</p>
                        <Button variant="outline" className="w-full">
                          Join Discussions
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Email Support</h3>
                        <p className="text-sm text-gray-600 mb-4">Contact the developer directly for support.</p>
                        <Button variant="outline" className="w-full">
                          Send Email
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="credits">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Credits & License</CardTitle>
                    <CardDescription>Information about the project contributors and license</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Main Contributors</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-3 border rounded-lg">
                            <Avatar className="h-12 w-12">
                              <div className="w-full h-full rounded-full bg-[#00BFA6] flex items-center justify-center">
                                <span className="text-sm font-bold">TN</span>
                              </div>
                            </Avatar>
                            <div>
                              <p className="font-medium">Thanh Nong Nguyen</p>
                              <p className="text-sm text-gray-500">Project Lead & Developer</p>
                              <div className="flex items-center gap-2 mt-1">
                                <a
                                  href="https://github.com/thanhnn16"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#4B0082] hover:underline flex items-center"
                                >
                                  <Github size={12} className="mr-1" />
                                  @thanhnn16
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 p-3 border rounded-lg">
                            <Avatar className="h-12 w-12">
                              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-sm font-bold">V0</span>
                              </div>
                            </Avatar>
                            <div>
                              <p className="font-medium">Vercel v0</p>
                              <p className="text-sm text-gray-500">UI Design & Development</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-3">License</h3>
                        <div className="p-4 bg-gray-50 rounded-lg border">
                          <p className="font-medium mb-2">MIT License</p>
                          <p className="text-sm text-gray-600 mb-3">Copyright (c) 2025 Thanh Nong Nguyen</p>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Permission is hereby granted, free of charge, to any person obtaining a copy of this
                            software and associated documentation files (the "Software"), to deal in the Software
                            without restriction, including without limitation the rights to use, copy, modify, merge,
                            publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
                            to whom the Software is furnished to do so, subject to the following conditions:
                            <br />
                            <br />
                            The above copyright notice and this permission notice shall be included in all copies or
                            substantial portions of the Software.
                            <br />
                            <br />
                            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                            INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                            PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
                            FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                            OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
                            DEALINGS IN THE SOFTWARE.
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-3">Acknowledgements</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4B0082]"></div>
                            <span>Next.js - React Framework</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4B0082]"></div>
                            <span>shadcn/ui - UI Component Library</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4B0082]"></div>
                            <span>Framer Motion - Animation Library</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4B0082]"></div>
                            <span>Lucide Icons - Icon Library</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4B0082]"></div>
                            <span>Tailwind CSS - Utility-first CSS Framework</span>
                          </li>
                        </ul>
                      </div>
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
