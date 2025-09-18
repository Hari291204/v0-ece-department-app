"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Bell, Users, Video, Send, Phone, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface Message {
  id: string
  sender: string
  senderType: "student" | "teacher"
  recipient: string
  content: string
  timestamp: string
  read: boolean
  type: "direct" | "group" | "announcement"
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: string
  read: boolean
  actionRequired: boolean
}

interface ForumPost {
  id: string
  title: string
  author: string
  authorType: "student" | "teacher"
  course: string
  content: string
  timestamp: string
  replies: number
  likes: number
  tags: string[]
}

export default function CommunicationHub() {
  const [activeTab, setActiveTab] = useState("messages")
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const messages: Message[] = [
    {
      id: "1",
      sender: "Dr. Smith",
      senderType: "teacher",
      recipient: "You",
      content: "Please submit your lab report by Friday.",
      timestamp: "2024-03-20 10:30",
      read: false,
      type: "direct",
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      senderType: "student",
      recipient: "Study Group",
      content: "Anyone available for group study tonight?",
      timestamp: "2024-03-20 09:15",
      read: true,
      type: "group",
    },
    {
      id: "3",
      sender: "ECE Department",
      senderType: "teacher",
      recipient: "All Students",
      content: "Lab equipment maintenance scheduled for next week.",
      timestamp: "2024-03-19 16:00",
      read: true,
      type: "announcement",
    },
    {
      id: "4",
      sender: "Prof. Davis",
      senderType: "teacher",
      recipient: "You",
      content: "Great work on your project presentation!",
      timestamp: "2024-03-19 14:20",
      read: false,
      type: "direct",
    },
  ]

  const notifications: Notification[] = [
    {
      id: "1",
      title: "Assignment Due Soon",
      message: "Digital Signal Processing assignment due in 2 days",
      type: "warning",
      timestamp: "2024-03-20 11:00",
      read: false,
      actionRequired: true,
    },
    {
      id: "2",
      title: "Grade Posted",
      message: "Your grade for Microprocessors midterm is now available",
      type: "success",
      timestamp: "2024-03-20 10:45",
      read: false,
      actionRequired: false,
    },
    {
      id: "3",
      title: "Lab Session Cancelled",
      message: "Tomorrow's lab session has been cancelled due to equipment maintenance",
      type: "info",
      timestamp: "2024-03-20 09:30",
      read: true,
      actionRequired: false,
    },
    {
      id: "4",
      title: "Payment Overdue",
      message: "Your semester fee payment is overdue. Please pay immediately.",
      type: "error",
      timestamp: "2024-03-19 15:00",
      read: false,
      actionRequired: true,
    },
  ]

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Help with FPGA Programming",
      author: "Mike Chen",
      authorType: "student",
      course: "Digital Design",
      content: "I'm having trouble with Verilog syntax for my FPGA project...",
      timestamp: "2024-03-20 12:00",
      replies: 5,
      likes: 8,
      tags: ["FPGA", "Verilog", "Help"],
    },
    {
      id: "2",
      title: "Study Group for Final Exams",
      author: "Lisa Wang",
      authorType: "student",
      course: "Signal Processing",
      content: "Looking to form a study group for the upcoming finals...",
      timestamp: "2024-03-20 11:30",
      replies: 12,
      likes: 15,
      tags: ["Study Group", "Finals"],
    },
    {
      id: "3",
      title: "Career Opportunities in AI",
      author: "Dr. Johnson",
      authorType: "teacher",
      course: "General",
      content: "Sharing some exciting career opportunities in AI and machine learning...",
      timestamp: "2024-03-20 10:00",
      replies: 8,
      likes: 22,
      tags: ["Career", "AI", "Opportunities"],
    },
    {
      id: "4",
      title: "Lab Equipment Best Practices",
      author: "Prof. Martinez",
      authorType: "teacher",
      course: "Electronics Lab",
      content: "Important guidelines for using lab equipment safely and effectively...",
      timestamp: "2024-03-19 16:30",
      replies: 3,
      likes: 18,
      tags: ["Lab", "Safety", "Guidelines"],
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Communication Hub</h1>
        <div className="flex gap-2">
          <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
            <DialogTrigger asChild>
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
                <DialogDescription>Send a message to students or teachers.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                      <SelectItem value="prof-davis">Prof. Davis</SelectItem>
                      <SelectItem value="study-group">Study Group</SelectItem>
                      <SelectItem value="all-students">All Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Message subject" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here..." rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsNewMessageOpen(false)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Video className="h-4 w-4 mr-2" />
            Start Meeting
          </Button>
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {["messages", "notifications", "forums", "meetings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab === "messages" && "Messages"}
            {tab === "notifications" && "Notifications"}
            {tab === "forums" && "Discussion Forums"}
            {tab === "meetings" && "Video Meetings"}
          </button>
        ))}
      </div>

      {activeTab === "messages" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => setSelectedChat(message.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat === message.id ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                        } ${!message.read ? "border-l-4 border-l-green-500" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          <span className="text-xs text-gray-500">{message.timestamp.split(" ")[1]}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {message.type}
                          </Badge>
                          {!message.read && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{selectedChat ? "Message Thread" : "Select a conversation"}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedChat ? (
                  <div className="space-y-4">
                    <ScrollArea className="h-64 border rounded-lg p-4">
                      <div className="space-y-4">
                        {messages
                          .filter((m) => m.id === selectedChat)
                          .map((message) => (
                            <div key={message.id} className="flex items-start space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                  {message.sender
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-sm">{message.sender}</span>
                                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700">{message.content}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input placeholder="Type your reply..." className="flex-1" />
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Select a conversation to view messages</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`border-l-4 ${getNotificationColor(notification.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          {!notification.read && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          {notification.actionRequired && (
                            <Badge className="bg-red-100 text-red-800 text-xs">Action Required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {notification.actionRequired && <Button size="sm">Take Action</Button>}
                      <Button variant="ghost" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "forums" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Discussion Forums</h2>
            <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
              <DialogTrigger asChild>
                <Button>Create New Post</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create Forum Post</DialogTitle>
                  <DialogDescription>Start a new discussion or ask a question.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input id="post-title" placeholder="Enter post title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="course">Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital-design">Digital Design</SelectItem>
                        <SelectItem value="signal-processing">Signal Processing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="general">General Discussion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea id="post-content" placeholder="Write your post content..." rows={6} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g., FPGA, Help, Study Group" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsNewPostOpen(false)}>
                    Create Post
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{post.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {post.authorType}
                          </Badge>
                        </div>
                        <span>•</span>
                        <span>{post.course}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{post.replies} replies</span>
                      <span>{post.likes} likes</span>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "meetings" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Video className="h-5 w-5 text-green-600" />
                  <span>Start Instant Meeting</span>
                </CardTitle>
                <CardDescription>Begin a video conference immediately</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Start Meeting
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>Office Hours</span>
                </CardTitle>
                <CardDescription>Join scheduled office hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <strong>Dr. Smith:</strong> Mon, Wed 2-4 PM
                  </p>
                  <p className="text-sm">
                    <strong>Prof. Davis:</strong> Tue, Thu 10-12 PM
                  </p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Join Office Hours
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Study Groups</span>
                </CardTitle>
                <CardDescription>Join or create study group sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">Active Groups: 3</p>
                  <p className="text-sm">Next Session: Today 7 PM</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Join Study Group
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Digital Design Lab Review</h3>
                    <p className="text-sm text-gray-600">Today at 3:00 PM • Dr. Smith</p>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Project Presentation</h3>
                    <p className="text-sm text-gray-600">Tomorrow at 10:00 AM • Prof. Davis</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Scheduled
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Study Group - Signal Processing</h3>
                    <p className="text-sm text-gray-600">Friday at 7:00 PM • Student Group</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Scheduled
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
