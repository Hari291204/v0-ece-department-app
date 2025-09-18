"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Calculator,
  TrendingUp,
  FileText,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  BarChart3,
  PieChartIcon,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react"

interface GradeEntry {
  id: string
  studentId: string
  studentName: string
  assignmentId: string
  assignmentName: string
  score: number
  maxScore: number
  percentage: number
  submittedAt: string
  gradedAt?: string
  feedback?: string
  late: boolean
}

interface StudentGrade {
  studentId: string
  studentName: string
  email: string
  assignments: { [key: string]: number }
  totalScore: number
  maxTotalScore: number
  percentage: number
  letterGrade: string
  attendance: number
  participationScore: number
}

interface Assignment {
  id: string
  name: string
  type: "assignment" | "exam" | "project" | "lab" | "quiz"
  maxScore: number
  weight: number
  dueDate: string
  avgScore: number
  submissions: number
  totalStudents: number
}

interface GradeDistribution {
  grade: string
  count: number
  percentage: number
}

export default function GradeManagement({ courseId, userType }: { courseId: string; userType: "student" | "teacher" }) {
  const [activeTab, setActiveTab] = useState("gradebook")
  const [selectedAssignment, setSelectedAssignment] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")

  // Mock data
  const assignments: Assignment[] = [
    {
      id: "1",
      name: "Lab Report 1",
      type: "lab",
      maxScore: 100,
      weight: 0.15,
      dueDate: "2024-09-15",
      avgScore: 87.5,
      submissions: 42,
      totalStudents: 45,
    },
    {
      id: "2",
      name: "Midterm Exam",
      type: "exam",
      maxScore: 150,
      weight: 0.25,
      dueDate: "2024-10-15",
      avgScore: 82.3,
      submissions: 45,
      totalStudents: 45,
    },
    {
      id: "3",
      name: "Project Phase 1",
      type: "project",
      maxScore: 200,
      weight: 0.2,
      dueDate: "2024-11-01",
      avgScore: 89.1,
      submissions: 40,
      totalStudents: 45,
    },
    {
      id: "4",
      name: "Quiz 1",
      type: "quiz",
      maxScore: 50,
      weight: 0.1,
      dueDate: "2024-09-30",
      avgScore: 91.2,
      submissions: 44,
      totalStudents: 45,
    },
  ]

  const studentGrades: StudentGrade[] = [
    {
      studentId: "1",
      studentName: "John Doe",
      email: "john.doe@university.edu",
      assignments: { "1": 92, "2": 88, "3": 95, "4": 89 },
      totalScore: 364,
      maxTotalScore: 500,
      percentage: 91.0,
      letterGrade: "A-",
      attendance: 94,
      participationScore: 85,
    },
    {
      studentId: "2",
      studentName: "Jane Smith",
      email: "jane.smith@university.edu",
      assignments: { "1": 95, "2": 92, "3": 98, "4": 94 },
      totalScore: 379,
      maxTotalScore: 500,
      percentage: 95.8,
      letterGrade: "A",
      attendance: 98,
      participationScore: 92,
    },
    {
      studentId: "3",
      studentName: "Mike Johnson",
      email: "mike.johnson@university.edu",
      assignments: { "1": 78, "2": 75, "3": 82, "4": 80 },
      totalScore: 315,
      maxTotalScore: 500,
      percentage: 78.8,
      letterGrade: "B-",
      attendance: 87,
      participationScore: 75,
    },
    {
      studentId: "4",
      studentName: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      assignments: { "1": 88, "2": 85, "3": 90, "4": 87 },
      totalScore: 350,
      maxTotalScore: 500,
      percentage: 87.5,
      letterGrade: "B+",
      attendance: 92,
      participationScore: 88,
    },
  ]

  const gradeDistribution: GradeDistribution[] = [
    { grade: "A", count: 8, percentage: 17.8 },
    { grade: "A-", count: 12, percentage: 26.7 },
    { grade: "B+", count: 10, percentage: 22.2 },
    { grade: "B", count: 8, percentage: 17.8 },
    { grade: "B-", count: 5, percentage: 11.1 },
    { grade: "C+", count: 2, percentage: 4.4 },
  ]

  const performanceData = [
    { assignment: "Lab 1", average: 87.5, highest: 98, lowest: 65 },
    { assignment: "Midterm", average: 82.3, highest: 95, lowest: 58 },
    { assignment: "Project 1", average: 89.1, highest: 100, lowest: 72 },
    { assignment: "Quiz 1", average: 91.2, highest: 100, lowest: 78 },
  ]

  const trendData = [
    { week: "Week 1", average: 85.2 },
    { week: "Week 2", average: 87.1 },
    { week: "Week 3", average: 84.8 },
    { week: "Week 4", average: 88.5 },
    { week: "Week 5", average: 89.3 },
    { week: "Week 6", average: 87.9 },
  ]

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  const getLetterGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
      case "A-":
        return "bg-green-100 text-green-800"
      case "B+":
      case "B":
        return "bg-blue-100 text-blue-800"
      case "B-":
      case "C+":
        return "bg-yellow-100 text-yellow-800"
      case "C":
      case "C-":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800"
      case "project":
        return "bg-purple-100 text-purple-800"
      case "lab":
        return "bg-green-100 text-green-800"
      case "quiz":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredStudents = studentGrades.filter((student) => {
    const matchesSearch =
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = gradeFilter === "all" || student.letterGrade === gradeFilter
    return matchesSearch && matchesGrade
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Grade Management</h1>
              <p className="text-muted-foreground">ECE 401 - Digital Signal Processing</p>
            </div>
            {userType === "teacher" && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Grades
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Grades
                </Button>
                <Button size="sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Grade Calculator
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gradebook">Gradebook</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="assignments">Assignment Grades</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="gradebook" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={gradeFilter} onValueChange={setGradeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="C+">C+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {userType === "teacher" && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Grade Entry
                </Button>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Gradebook</CardTitle>
                <CardDescription>Complete grade overview for all students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Email</TableHead>
                        {assignments.map((assignment) => (
                          <TableHead key={assignment.id} className="text-center">
                            {assignment.name}
                            <br />
                            <span className="text-xs text-muted-foreground">({assignment.maxScore}pts)</span>
                          </TableHead>
                        ))}
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Percentage</TableHead>
                        <TableHead className="text-center">Letter Grade</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.studentId}>
                          <TableCell className="font-medium">{student.studentName}</TableCell>
                          <TableCell className="text-muted-foreground">{student.email}</TableCell>
                          {assignments.map((assignment) => (
                            <TableCell key={assignment.id} className="text-center">
                              {student.assignments[assignment.id] ? (
                                <span className="font-medium">{student.assignments[assignment.id]}</span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          ))}
                          <TableCell className="text-center font-medium">
                            {student.totalScore}/{student.maxTotalScore}
                          </TableCell>
                          <TableCell className="text-center font-medium">{student.percentage.toFixed(1)}%</TableCell>
                          <TableCell className="text-center">
                            <Badge className={getLetterGradeColor(student.letterGrade)}>{student.letterGrade}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center space-x-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              {userType === "teacher" && (
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Class Average</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">87.2%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last assignment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">95.8%</div>
                  <p className="text-xs text-muted-foreground">Jane Smith</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Students at Risk</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <p className="text-xs text-muted-foreground">Below 75%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">Assignment submissions</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>Distribution of letter grades in the class</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Class average over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[75, 95]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="average" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Assignment Performance Comparison</CardTitle>
                <CardDescription>Average, highest, and lowest scores by assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="assignment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#3b82f6" name="Average" />
                    <Bar dataKey="highest" fill="#22c55e" name="Highest" />
                    <Bar dataKey="lowest" fill="#ef4444" name="Lowest" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignments</SelectItem>
                  {assignments.map((assignment) => (
                    <SelectItem key={assignment.id} value={assignment.id}>
                      {assignment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {userType === "teacher" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Bulk Grade Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Bulk Grade Entry</DialogTitle>
                      <DialogDescription>Enter grades for multiple students at once</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="assignment-select">Assignment</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignment" />
                          </SelectTrigger>
                          <SelectContent>
                            {assignments.map((assignment) => (
                              <SelectItem key={assignment.id} value={assignment.id}>
                                {assignment.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="csv-upload">Upload CSV File</Label>
                        <Input id="csv-upload" type="file" accept=".csv" />
                      </div>
                      <Button className="w-full">Upload Grades</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="grid gap-6">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{assignment.name}</CardTitle>
                        <CardDescription>
                          Due: {assignment.dueDate} • Max Score: {assignment.maxScore} points
                        </CardDescription>
                      </div>
                      <Badge className={getAssignmentTypeColor(assignment.type)}>{assignment.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Average Score:</span>
                        <p className="font-medium text-primary">{assignment.avgScore}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Submissions:</span>
                        <p className="font-medium">
                          {assignment.submissions}/{assignment.totalStudents}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Weight:</span>
                        <p className="font-medium">{(assignment.weight * 100).toFixed(0)}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completion:</span>
                        <p className="font-medium">
                          {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                        </p>
                      </div>
                    </div>
                    <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                    {userType === "teacher" && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View All Grades
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Grades
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Statistics
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Grade Report</span>
                  </CardTitle>
                  <CardDescription>Comprehensive grade summary for all students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics Report</span>
                  </CardTitle>
                  <CardDescription>Statistical analysis and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>At-Risk Students</span>
                  </CardTitle>
                  <CardDescription>Students who may need additional support</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChartIcon className="h-5 w-5" />
                    <span>Grade Distribution</span>
                  </CardTitle>
                  <CardDescription>Visual breakdown of grade distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Learning Outcomes</span>
                  </CardTitle>
                  <CardDescription>Assessment of course learning objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Progress Report</span>
                  </CardTitle>
                  <CardDescription>Student progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
