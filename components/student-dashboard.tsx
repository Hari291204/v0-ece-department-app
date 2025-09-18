"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Settings,
  GraduationCap,
  LogOut,
} from "lucide-react"

interface Course {
  id: string
  name: string
  code: string
  professor: string
  credits: number
  grade: string
  progress: number
}

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  grade?: number
  type: "assignment" | "exam" | "project" | "lab"
}

interface Grade {
  id: string
  assignment: string
  course: string
  score: number
  maxScore: number
  date: string
  feedback?: string
}

interface StudentDashboardProps {
  onLogout?: () => void
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const courses: Course[] = [
    {
      id: "1",
      name: "Digital Signal Processing",
      code: "ECE 401",
      professor: "Dr. Smith",
      credits: 3,
      grade: "A-",
      progress: 85,
    },
    {
      id: "2",
      name: "Computer Architecture",
      code: "ECE 350",
      professor: "Dr. Johnson",
      credits: 4,
      grade: "B+",
      progress: 78,
    },
    { id: "3", name: "Control Systems", code: "ECE 380", professor: "Dr. Davis", credits: 3, grade: "A", progress: 92 },
    {
      id: "4",
      name: "Embedded Systems",
      code: "ECE 445",
      professor: "Dr. Wilson",
      credits: 4,
      grade: "B",
      progress: 70,
    },
  ]

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Final Project Proposal",
      course: "ECE 401",
      dueDate: "2024-12-15",
      status: "pending",
      type: "project",
    },
    {
      id: "2",
      title: "Architecture Design Report",
      course: "ECE 350",
      dueDate: "2024-12-18",
      status: "pending",
      type: "assignment",
    },
    {
      id: "3",
      title: "Control System Analysis",
      course: "ECE 380",
      dueDate: "2024-12-20",
      status: "submitted",
      type: "assignment",
    },
    {
      id: "4",
      title: "Embedded Lab 5",
      course: "ECE 445",
      dueDate: "2024-12-12",
      status: "graded",
      grade: 88,
      type: "lab",
    },
  ]

  const grades: Grade[] = [
    {
      id: "1",
      assignment: "Midterm Exam",
      course: "ECE 401",
      score: 92,
      maxScore: 100,
      date: "2024-11-15",
      feedback: "Excellent work on signal analysis",
    },
    {
      id: "2",
      assignment: "Lab Report 3",
      course: "ECE 350",
      score: 85,
      maxScore: 100,
      date: "2024-11-20",
      feedback: "Good implementation, minor documentation issues",
    },
    { id: "3", assignment: "Quiz 4", course: "ECE 380", score: 95, maxScore: 100, date: "2024-11-22" },
    {
      id: "4",
      assignment: "Project Phase 1",
      course: "ECE 445",
      score: 78,
      maxScore: 100,
      date: "2024-11-25",
      feedback: "Needs improvement in testing methodology",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "submitted":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "graded":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-blue-100 text-blue-800"
      case "exam":
        return "bg-red-100 text-red-800"
      case "project":
        return "bg-purple-100 text-purple-800"
      case "lab":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">ECE Student Portal</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Welcome, John Doe</span>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">3.67</div>
                  <p className="text-xs text-muted-foreground">+0.12 from last semester</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Credits Enrolled</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14</div>
                  <p className="text-xs text-muted-foreground">4 courses this semester</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">2</div>
                  <p className="text-xs text-muted-foreground">Due this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance</CardTitle>
                  <CardDescription>Excellent attendance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Attendance</span>
                      <span className="text-sm text-muted-foreground">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>Your progress in each course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{course.code}</span>
                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Don't miss these important dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {assignments
                    .filter((a) => a.status === "pending")
                    .map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(assignment.status)}
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {assignment.course} - Due: {assignment.dueDate}
                            </p>
                          </div>
                        </div>
                        <Badge className={getTypeColor(assignment.type)}>{assignment.type}</Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>
                          {course.code} - {course.professor}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{course.credits} Credits</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Grade:</span>
                      <span className="text-lg font-bold text-primary">{course.grade}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Progress:</span>
                        <span className="text-sm">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Materials
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>Track your assignments and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(assignment.status)}
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {assignment.course} - Due: {assignment.dueDate}
                          </p>
                          {assignment.grade && (
                            <p className="text-sm font-medium text-primary">Grade: {assignment.grade}%</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(assignment.type)}>{assignment.type}</Badge>
                        {assignment.status === "pending" && (
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Submit
                          </Button>
                        )}
                        {assignment.status === "graded" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade History</CardTitle>
                <CardDescription>Your academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {grades.map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{grade.assignment}</h3>
                            <p className="text-sm text-muted-foreground">
                              {grade.course} - {grade.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary">
                              {grade.score}/{grade.maxScore}
                            </span>
                            <p className="text-sm text-muted-foreground">
                              {Math.round((grade.score / grade.maxScore) * 100)}%
                            </p>
                          </div>
                        </div>
                        {grade.feedback && (
                          <div className="mt-2 p-2 bg-muted rounded text-sm">
                            <strong>Feedback:</strong> {grade.feedback}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
