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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Plus,
  Edit,
  Eye,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  LogOut,
} from "lucide-react"

interface TeacherCourse {
  id: string
  name: string
  code: string
  semester: string
  students: number
  avgGrade: number
  assignments: number
  pendingGrades: number
}

interface Student {
  id: string
  name: string
  email: string
  studentId: string
  gpa: number
  attendance: number
  assignments: number
  grade: string
}

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  submissions: number
  totalStudents: number
  avgScore?: number
  type: "assignment" | "exam" | "project" | "lab"
}

interface Submission {
  id: string
  studentName: string
  studentId: string
  submittedAt: string
  status: "submitted" | "graded" | "late"
  score?: number
  feedback?: string
}

interface TeacherDashboardProps {
  onLogout?: () => void
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  // Mock data
  const courses: TeacherCourse[] = [
    {
      id: "1",
      name: "Digital Signal Processing",
      code: "ECE 401",
      semester: "Fall 2024",
      students: 45,
      avgGrade: 87.5,
      assignments: 8,
      pendingGrades: 15,
    },
    {
      id: "2",
      name: "Introduction to ECE",
      code: "ECE 101",
      semester: "Fall 2024",
      students: 120,
      avgGrade: 82.3,
      assignments: 6,
      pendingGrades: 8,
    },
    {
      id: "3",
      name: "Advanced Circuits",
      code: "ECE 320",
      semester: "Fall 2024",
      students: 35,
      avgGrade: 89.1,
      assignments: 10,
      pendingGrades: 22,
    },
  ]

  const students: Student[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@university.edu",
      studentId: "ECE2021001",
      gpa: 3.67,
      attendance: 94,
      assignments: 8,
      grade: "A-",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      studentId: "ECE2021002",
      gpa: 3.89,
      attendance: 98,
      assignments: 8,
      grade: "A",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      studentId: "ECE2021003",
      gpa: 3.45,
      attendance: 87,
      assignments: 7,
      grade: "B+",
    },
  ]

  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Lab Report 3",
      course: "ECE 401",
      dueDate: "2024-12-15",
      submissions: 40,
      totalStudents: 45,
      avgScore: 85.2,
      type: "lab",
    },
    {
      id: "2",
      title: "Midterm Exam",
      course: "ECE 101",
      dueDate: "2024-12-10",
      submissions: 115,
      totalStudents: 120,
      avgScore: 78.5,
      type: "exam",
    },
    {
      id: "3",
      title: "Circuit Design Project",
      course: "ECE 320",
      dueDate: "2024-12-20",
      submissions: 30,
      totalStudents: 35,
      type: "project",
    },
  ]

  const submissions: Submission[] = [
    {
      id: "1",
      studentName: "John Doe",
      studentId: "ECE2021001",
      submittedAt: "2024-12-14 14:30",
      status: "submitted",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      studentId: "ECE2021002",
      submittedAt: "2024-12-13 16:45",
      status: "graded",
      score: 92,
      feedback: "Excellent analysis and clear presentation",
    },
    {
      id: "3",
      studentName: "Mike Johnson",
      studentId: "ECE2021003",
      submittedAt: "2024-12-15 23:59",
      status: "late",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "graded":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "late":
        return <AlertCircle className="h-4 w-4 text-red-500" />
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
            <h1 className="text-xl font-semibold">ECE Teacher Portal</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Welcome, Dr. Smith</span>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="grading">Grading</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">200</div>
                  <p className="text-xs text-muted-foreground">Across 3 courses</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">86.3%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last semester</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">45</div>
                  <p className="text-xs text-muted-foreground">Assignments to grade</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">93%</div>
                  <p className="text-xs text-muted-foreground">Overall attendance</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Average grades by course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{course.code}</span>
                        <span className="text-sm text-muted-foreground">{course.avgGrade}%</span>
                      </div>
                      <Progress value={course.avgGrade} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest submissions and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">New submission received</p>
                      <p className="text-sm text-muted-foreground">Lab Report 3 - John Doe</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">Assignment due soon</p>
                      <p className="text-sm text-muted-foreground">Circuit Design Project - Dec 20</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">Late submission</p>
                      <p className="text-sm text-muted-foreground">Midterm Exam - Mike Johnson</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>Create a new course for the current semester</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-name">Course Name</Label>
                      <Input id="course-name" placeholder="e.g., Digital Signal Processing" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-code">Course Code</Label>
                      <Input id="course-code" placeholder="e.g., ECE 401" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-description">Description</Label>
                      <Textarea id="course-description" placeholder="Course description..." />
                    </div>
                    <Button className="w-full">Create Course</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>
                          {course.code} - {course.semester}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{course.students} Students</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg Grade:</span>
                        <p className="font-medium text-primary">{course.avgGrade}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assignments:</span>
                        <p className="font-medium">{course.assignments}</p>
                      </div>
                    </div>
                    {course.pendingGrades > 0 && (
                      <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                        <span className="font-medium text-yellow-800">
                          {course.pendingGrades} assignments pending grade
                        </span>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage student information</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Assignments</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.gpa}</TableCell>
                        <TableCell>{student.attendance}%</TableCell>
                        <TableCell>{student.assignments}/8</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{student.grade}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Assignment Management</h2>
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
                      <Label htmlFor="assignment-title">Assignment Title</Label>
                      <Input id="assignment-title" placeholder="e.g., Lab Report 4" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignment-description">Description</Label>
                      <Textarea id="assignment-description" placeholder="Assignment description..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Due Date</Label>
                      <Input id="due-date" type="date" />
                    </div>
                    <Button className="w-full">Create Assignment</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{assignment.title}</CardTitle>
                        <CardDescription>
                          {assignment.course} - Due: {assignment.dueDate}
                        </CardDescription>
                      </div>
                      <Badge className={getTypeColor(assignment.type)}>{assignment.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Submissions:</span>
                        <p className="font-medium">
                          {assignment.submissions}/{assignment.totalStudents}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completion:</span>
                        <p className="font-medium">
                          {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                        </p>
                      </div>
                      {assignment.avgScore && (
                        <div>
                          <span className="text-muted-foreground">Avg Score:</span>
                          <p className="font-medium text-primary">{assignment.avgScore}%</p>
                        </div>
                      )}
                    </div>
                    <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Submissions
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grading" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Grading Queue</CardTitle>
                <CardDescription>Review and grade student submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(submission.status)}
                        <div>
                          <h3 className="font-medium">{submission.studentName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {submission.studentId} - Submitted: {submission.submittedAt}
                          </p>
                          {submission.score && (
                            <p className="text-sm font-medium text-primary">Score: {submission.score}%</p>
                          )}
                          {submission.feedback && (
                            <p className="text-sm text-muted-foreground mt-1">"{submission.feedback}"</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {submission.status === "submitted" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">Grade</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Grade Submission</DialogTitle>
                                <DialogDescription>Grade submission from {submission.studentName}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="score">Score (out of 100)</Label>
                                  <Input id="score" type="number" placeholder="85" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="feedback">Feedback</Label>
                                  <Textarea id="feedback" placeholder="Great work! Consider..." />
                                </div>
                                <Button className="w-full">Submit Grade</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
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
