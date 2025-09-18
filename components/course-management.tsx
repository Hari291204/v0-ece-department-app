"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  FileText,
  Calendar,
  Users,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  Bell,
  AlertCircle,
  ArrowLeft,
  Video,
  Link,
  MessageSquare,
} from "lucide-react"

interface CourseDetail {
  id: string
  name: string
  code: string
  professor: string
  semester: string
  credits: number
  description: string
  schedule: string
  location: string
  students: number
  syllabus?: string
}

interface Announcement {
  id: string
  title: string
  content: string
  date: string
  priority: "low" | "medium" | "high"
  author: string
}

interface Material {
  id: string
  title: string
  type: "pdf" | "video" | "link" | "document"
  size?: string
  uploadDate: string
  downloads: number
  url: string
}

interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  points: number
  type: "assignment" | "exam" | "project" | "lab"
  status: "draft" | "published" | "closed"
  submissions: number
  totalStudents: number
}

interface ScheduleItem {
  id: string
  title: string
  type: "lecture" | "lab" | "exam" | "assignment"
  date: string
  time: string
  location?: string
  description?: string
}

export default function CourseManagement({
  courseId,
  userType,
}: { courseId: string; userType: "student" | "teacher" }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const course: CourseDetail = {
    id: courseId,
    name: "Digital Signal Processing",
    code: "ECE 401",
    professor: "Dr. Smith",
    semester: "Fall 2024",
    credits: 3,
    description:
      "This course covers the fundamentals of digital signal processing including sampling, quantization, discrete-time signals and systems, z-transforms, digital filter design, and FFT algorithms.",
    schedule: "MWF 10:00-11:00 AM",
    location: "Engineering Building Room 205",
    students: 45,
    syllabus: "syllabus-ece401-fall2024.pdf",
  }

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Midterm Exam Schedule",
      content:
        "The midterm exam will be held on November 15th at 10:00 AM in the regular classroom. Please bring a calculator and photo ID.",
      date: "2024-11-01",
      priority: "high",
      author: "Dr. Smith",
    },
    {
      id: "2",
      title: "Lab Report 3 Due Date Extended",
      content:
        "Due to technical issues with the lab equipment, the due date for Lab Report 3 has been extended to November 20th.",
      date: "2024-10-28",
      priority: "medium",
      author: "Dr. Smith",
    },
    {
      id: "3",
      title: "Office Hours Change",
      content: "Office hours for this week will be moved to Thursday 2-4 PM instead of Wednesday.",
      date: "2024-10-25",
      priority: "low",
      author: "Dr. Smith",
    },
  ]

  const materials: Material[] = [
    {
      id: "1",
      title: "Chapter 1: Introduction to DSP",
      type: "pdf",
      size: "2.5 MB",
      uploadDate: "2024-08-25",
      downloads: 42,
      url: "/materials/chapter1.pdf",
    },
    {
      id: "2",
      title: "Lecture 5: Z-Transform Properties",
      type: "video",
      uploadDate: "2024-09-15",
      downloads: 38,
      url: "/materials/lecture5.mp4",
    },
    {
      id: "3",
      title: "MATLAB Tutorial: Filter Design",
      type: "document",
      size: "1.8 MB",
      uploadDate: "2024-09-20",
      downloads: 35,
      url: "/materials/matlab-tutorial.docx",
    },
    {
      id: "4",
      title: "DSP Toolbox Documentation",
      type: "link",
      uploadDate: "2024-08-30",
      downloads: 28,
      url: "https://mathworks.com/dsp-toolbox",
    },
  ]

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Lab Report 3: Digital Filters",
      description: "Design and implement a digital filter using MATLAB. Submit your code and analysis report.",
      dueDate: "2024-11-20",
      points: 100,
      type: "lab",
      status: "published",
      submissions: 35,
      totalStudents: 45,
    },
    {
      id: "2",
      title: "Midterm Exam",
      description: "Comprehensive exam covering chapters 1-5",
      dueDate: "2024-11-15",
      points: 150,
      type: "exam",
      status: "published",
      submissions: 0,
      totalStudents: 45,
    },
    {
      id: "3",
      title: "Final Project Proposal",
      description: "Submit a 2-page proposal for your final project including objectives, methodology, and timeline.",
      dueDate: "2024-12-01",
      points: 50,
      type: "project",
      status: "draft",
      submissions: 0,
      totalStudents: 45,
    },
  ]

  const schedule: ScheduleItem[] = [
    {
      id: "1",
      title: "Introduction to Digital Signals",
      type: "lecture",
      date: "2024-11-11",
      time: "10:00 AM",
      location: "Engineering Building Room 205",
      description: "Overview of digital signal processing concepts",
    },
    {
      id: "2",
      title: "Lab 4: FFT Implementation",
      type: "lab",
      date: "2024-11-13",
      time: "2:00 PM",
      location: "Computer Lab 101",
      description: "Hands-on implementation of Fast Fourier Transform",
    },
    {
      id: "3",
      title: "Midterm Exam",
      type: "exam",
      date: "2024-11-15",
      time: "10:00 AM",
      location: "Engineering Building Room 205",
      description: "Comprehensive exam covering chapters 1-5",
    },
    {
      id: "4",
      title: "Final Project Proposal Due",
      type: "assignment",
      date: "2024-12-01",
      time: "11:59 PM",
      description: "Submit project proposal via course portal",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />
      case "link":
        return <Link className="h-4 w-4 text-green-500" />
      case "document":
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getScheduleIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "lab":
        return <Users className="h-4 w-4 text-green-500" />
      case "exam":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "assignment":
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{course.name}</h1>
              <p className="text-muted-foreground">
                {course.code} - {course.professor} - {course.semester}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span>{course.schedule}</span>
                <span>{course.location}</span>
                <span>{course.credits} Credits</span>
                <span>{course.students} Students</span>
              </div>
            </div>
            {userType === "teacher" && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Prerequisites:</span>
                      <p className="text-muted-foreground">ECE 300, MATH 340</p>
                    </div>
                    <div>
                      <span className="font-medium">Textbook:</span>
                      <p className="text-muted-foreground">Digital Signal Processing by Proakis</p>
                    </div>
                  </div>
                  {course.syllabus && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Syllabus
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Enrolled Students</span>
                      <span className="font-medium">{course.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assignments</span>
                      <span className="font-medium">{assignments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Materials</span>
                      <span className="font-medium">{materials.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Announcements</span>
                      <span className="font-medium">{announcements.length}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <Bell className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="font-medium">New announcement posted</p>
                        <p className="text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Upload className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium">New material uploaded</p>
                        <p className="text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <FileText className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="font-medium">Assignment deadline extended</p>
                        <p className="text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Announcements</h2>
              {userType === "teacher" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Announcement</DialogTitle>
                      <DialogDescription>Post a new announcement for your students</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="announcement-title">Title</Label>
                        <Input id="announcement-title" placeholder="Announcement title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="announcement-content">Content</Label>
                        <Textarea id="announcement-content" placeholder="Announcement content..." rows={4} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <select id="priority" className="w-full p-2 border rounded">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <Button className="w-full">Post Announcement</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription>
                          By {announcement.author} on {announcement.date}
                        </CardDescription>
                      </div>
                      <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Materials</h2>
              {userType === "teacher" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Material
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Course Material</DialogTitle>
                      <DialogDescription>Add new learning materials for your students</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="material-title">Title</Label>
                        <Input id="material-title" placeholder="Material title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="material-file">File</Label>
                        <Input id="material-file" type="file" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="material-description">Description (Optional)</Label>
                        <Textarea id="material-description" placeholder="Brief description..." />
                      </div>
                      <Button className="w-full">Upload Material</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="grid gap-4">
              {materials.map((material) => (
                <Card key={material.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(material.type)}
                        <div>
                          <h3 className="font-medium">{material.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Uploaded on {material.uploadDate}
                            {material.size && ` • ${material.size}`}• {material.downloads} downloads
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Assignments</h2>
              {userType === "teacher" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Assignment</DialogTitle>
                      <DialogDescription>Add a new assignment for your students</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="assignment-title">Title</Label>
                        <Input id="assignment-title" placeholder="Assignment title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignment-description">Description</Label>
                        <Textarea id="assignment-description" placeholder="Assignment description..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="due-date">Due Date</Label>
                          <Input id="due-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="points">Points</Label>
                          <Input id="points" type="number" placeholder="100" />
                        </div>
                      </div>
                      <Button className="w-full">Create Assignment</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{assignment.title}</CardTitle>
                        <CardDescription>
                          Due: {assignment.dueDate} • {assignment.points} points
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={assignment.status === "published" ? "default" : "secondary"}>
                          {assignment.status}
                        </Badge>
                        <Badge variant="outline">{assignment.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{assignment.description}</p>
                    {assignment.status === "published" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Submissions: {assignment.submissions}/{assignment.totalStudents}
                          </span>
                          <span>{Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</span>
                        </div>
                        <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                      </div>
                    )}
                    <div className="flex space-x-2">
                      {userType === "student" && assignment.status === "published" && (
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      )}
                      {userType === "teacher" && (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Submissions
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Schedule</CardTitle>
                <CardDescription>Upcoming lectures, labs, and important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">{getScheduleIcon(item.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{item.title}</h3>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {item.date} at {item.time}
                          </p>
                          {item.location && (
                            <p>
                              <Users className="h-3 w-3 inline mr-1" />
                              {item.location}
                            </p>
                          )}
                          {item.description && <p>{item.description}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Discussions</CardTitle>
                <CardDescription>Ask questions and participate in course discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Discussion Forum Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Interactive discussion features will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
