"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, MoreHorizontal, Check, X, AlertTriangle } from "lucide-react"

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(1)

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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Account Management</h1>
            <p className="text-gray-600">Manage your TikTok accounts</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-[#00BFA6] hover:bg-[#00BFA6]/90">
              <Plus size={18} className="mr-2" />
              Add New Account
            </Button>
          </motion.div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>TikTok Accounts</CardTitle>
            <CardDescription>Select an account to use for uploads</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Active</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account, index) => (
                    <motion.tr
                      key={account.id}
                      variants={itemVariants}
                      className={`${selectedAccount === account.id ? "bg-[#4B0082]/5" : ""} hover:bg-gray-100 cursor-pointer transition-colors`}
                      onClick={() => setSelectedAccount(account.id)}
                      whileHover={{ backgroundColor: "rgba(75, 0, 130, 0.05)" }}
                    >
                      <TableCell>
                        <div className="flex justify-center">
                          {selectedAccount === account.id ? (
                            <div className="w-5 h-5 rounded-full bg-[#4B0082] flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <img
                              src={`/placeholder.svg?height=40&width=40&text=${account.username.charAt(0).toUpperCase()}`}
                              alt={account.username}
                              className="object-cover"
                            />
                          </Avatar>
                          <div>
                            <div className="font-medium">{account.username}</div>
                            <div className="text-xs text-gray-500">{account.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`
                          ${
                            account.status === "active"
                              ? "bg-green-500"
                              : account.status === "warning"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          } 
                          text-white
                        `}
                        >
                          {account.status === "active" ? (
                            <Check size={12} className="mr-1" />
                          ) : account.status === "warning" ? (
                            <AlertTriangle size={12} className="mr-1" />
                          ) : (
                            <X size={12} className="mr-1" />
                          )}
                          {account.status === "active"
                            ? "Active"
                            : account.status === "warning"
                              ? "Warning"
                              : "Blocked"}
                        </Badge>
                      </TableCell>
                      <TableCell>{account.followers}</TableCell>
                      <TableCell>{account.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal size={18} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Account Actions</DialogTitle>
                              <DialogDescription>What would you like to do with @{account.username}?</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <Button className="bg-[#4B0082] hover:bg-[#4B0082]/90">Refresh Cookies</Button>
                              <Button variant="outline">Edit Account Details</Button>
                              <Button variant="destructive">Remove Account</Button>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
  )
}

// Sample data
const accounts = [
  {
    id: 1,
    username: "dancequeen",
    email: "dance@example.com",
    status: "active",
    followers: "12.5K",
    lastUsed: "Today",
  },
  {
    id: 2,
    username: "foodlover",
    email: "food@example.com",
    status: "warning",
    followers: "5.2K",
    lastUsed: "Yesterday",
  },
  {
    id: 3,
    username: "travelbug",
    email: "travel@example.com",
    status: "blocked",
    followers: "8.7K",
    lastUsed: "3 days ago",
  },
  {
    id: 4,
    username: "fitnessguru",
    email: "fitness@example.com",
    status: "active",
    followers: "20.1K",
    lastUsed: "1 week ago",
  },
]
