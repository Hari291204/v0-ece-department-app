"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Search,
  BarChart3,
  Brain,
  Shield,
} from "lucide-react"

interface Exam {
  id: string
  title: string
  course: string
  duration: number
  totalQuestions: number
  status: "draft" | "active" | "completed"
  startTime: string
  endTime: string
  attempts: number
  maxAttempts: number
}

interface PlagiarismReport {
  id: string
  studentName: string
  assignment: string
  similarityScore: number
  status: "clean" | "suspicious" | "flagged"
  submissionDate: string
  sources: string[]
}

interface AnalyticsData {
  coursePerformance: { course: string; average: number; trend: string }[]
  studentProgress: { student: string; completion: number; grade: number }[]
  difficultyAnalysis: { topic: string; difficulty: number; passRate: number }[]
}

interface PeerReview {
  id: string
  project: string
  reviewer: string
  reviewee: string
  score: number
  feedback: string
  status: "pending" | "completed" | "overdue"
  dueDate: string
}

interface LearningPath {
  id: string
  title: string
  description: string
  courses: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  completionRate: number
  prerequisites: string[]
}

export default function AcademicTools() {
  const [activeTab, setActiveTab] = useState("exams")
  const [isExamOpen, setIsExamOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)

  const exams: Exam[] = [
    {
      id: "1",
      title: "Digital Signal Processing Midterm",
      course: "DSP-301",
      duration: 120,
      totalQuestions: 50,
      status: "active",
      startTime: "2024-03-25 09:00",
      endTime: "2024-03-25 11:00",
      attempts: 1,
      maxAttempts: 2,
    },
    {
      id: "2",
      title: "Microprocessors Final Exam",
      course: "MP-401",
      duration: 180,
      totalQuestions: 75,
      status: "draft",
      startTime: "2024-04-15 14:00",
      endTime: "2024-04-15 17:00",
      attempts: 0,
      maxAttempts: 1,
    },
    {
      id: "3",
      title: "Electronics Lab Quiz",
      course: "EL-201",
      duration: 60,
      totalQuestions: 25,
      status: "completed",
      startTime: "2024-03-20 10:00",
      endTime: "2024-03-20 11:00",
      attempts: 2,
      maxAttempts: 2,
    },
  ]

  const plagiarismReports: PlagiarismReport[] = [
    {
      id: "1",
      studentName: "John Smith",
      assignment: "FPGA Design Project",
      similarityScore: 15,
      status: "clean",
      submissionDate: "2024-03-20",
      sources: [],
    },
    {
      id: "2",
      studentName: "Sarah Johnson",
      assignment: "Circuit Analysis Report",
      similarityScore: 45,
      status: "suspicious",
      submissionDate: "2024-03-19",
      sources: ["IEEE Paper 2023", "Student Work 2022"],
    },
    {
      id: "3",
      studentName: "Mike Davis",
      assignment: "Digital Filter Implementation",
      similarityScore: 78,
      status: "flagged",
      submissionDate: "2024-03-18",
      sources: ["GitHub Repository", "Course Material", "Previous Submission"],
    },
  ]

  const analyticsData: AnalyticsData = {
    coursePerformance: [
      { course: "Digital Signal Processing", average: 82, trend: "up" },
      { course: "Microprocessors", average: 76, trend: "down" },
      { course: "Electronics Lab", average: 88, trend: "up" },
      { course: "Circuit Analysis", average: 79, trend: "stable" },
    ],
    studentProgress: [
      { student: "John Smith", completion: 85, grade: 88 },
      { student: "Sarah Johnson", completion: 92, grade: 91 },
      { student: "Mike Davis", completion: 78, grade: 82 },
      { student: "Lisa Wang", completion: 95, grade: 94 },
    ],
    difficultyAnalysis: [
      { topic: "Fourier Transform", difficulty: 8.5, passRate: 72 },
      { topic: "Digital Filters", difficulty: 7.2, passRate: 85 },
      { topic: "Z-Transform", difficulty: 9.1, passRate: 68 },
      { topic: "Sampling Theory", difficulty: 6.8, passRate: 89 },
    ],
  }

  const peerReviews: PeerReview[] = [
    {
      id: "1",
      project: "Smart Home IoT System",
      reviewer: "Sarah Johnson",
      reviewee: "John Smith",
      score: 0,
      feedback: "",
      status: "pending",
      dueDate: "2024-03-25",
    },
    {
      id: "2",
      project: "Digital Audio Processor",
      reviewer: "Mike Davis",
      reviewee: "Lisa Wang",
      score: 87,
      feedback: "Excellent implementation with clear documentation.",
      status: "completed",
      dueDate: "2024-03-20",
    },
    {
      id: "3",
      project: "Robotic Arm Controller",
      reviewer: "John Smith",
      reviewee: "Sarah Johnson",
      score: 0,
      feedback: "",
      status: "overdue",
      dueDate: "2024-03-18",
    },
  ]

  const learningPaths: LearningPath[] = [
    {
      id: "1",
      title: "Digital Signal Processing Specialist",
      description: "Master digital signal processing from fundamentals to advanced applications",
      courses: ["DSP Fundamentals", "Advanced DSP", "Real-time Processing"],
      difficulty: "intermediate",
      duration: "6 months",
      completionRate: 68,
      prerequisites: ["Linear Algebra", "Calculus"],
    },
    {
      id: "2",
      title: "Embedded Systems Engineer",
      description: "Complete pathway to embedded systems design and programming",
      courses: ["Microprocessors", "Real-time Systems", "IoT Development"],
      difficulty: "advanced",
      duration: "8 months",
      completionRate: 45,
      prerequisites: ["C Programming", "Digital Logic"],
    },
    {
      id: "3",
      title: "VLSI Design Track",
      description: "Comprehensive VLSI design from basics to chip implementation",
      courses: ["Digital Design", "VLSI Fundamentals", "Chip Design"],
      difficulty: "advanced",
      duration: "10 months",
      completionRate: 52,
      prerequisites: ["Electronics", "Digital Logic"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "completed":
        return "bg-green-100 text-green-800"
      case "draft":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
      case "flagged":
        return "bg-red-100 text-red-800"
      case "suspicious":
        return "bg-orange-100 text-orange-800"
      case "clean":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSimilarityColor = (score: number) => {
    if (score < 25) return "text-green-600"
    if (score < 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Advanced Academic Tools</h1>
        <div className="flex gap-2">
          <Dialog open={isExamOpen} onOpenChange={setIsExamOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Exam</DialogTitle>
                <DialogDescription>Set up a new online examination with questions and settings.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="exam-title">Exam Title</Label>
                    <Input id="exam-title" placeholder="Enter exam title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="course">Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dsp-301">DSP-301</SelectItem>
                        <SelectItem value="mp-401">MP-401</SelectItem>
                        <SelectItem value="el-201">EL-201</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="120" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="questions">Total Questions</Label>
                    <Input id="questions" type="number" placeholder="50" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="attempts">Max Attempts</Label>
                    <Input id="attempts" type="number" placeholder="2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="datetime-local" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="datetime-local" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsExamOpen(false)}>
                  Create Exam
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="exams">Online Exams</TabsTrigger>
          <TabsTrigger value="plagiarism">Plagiarism Check</TabsTrigger>
          <TabsTrigger value="analytics">Grade Analytics</TabsTrigger>
          <TabsTrigger value="peer-review">Peer Review</TabsTrigger>
          <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
        </TabsList>

        <TabsContent value="exams" className="space-y-4">
          <div className="grid gap-4">
            {exams.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                  </div>
                  <CardDescription>{exam.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{exam.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Questions</p>
                        <p className="font-medium">{exam.totalQuestions}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Attempts</p>
                        <p className="font-medium">
                          {exam.attempts}/{exam.maxAttempts}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time Slot</p>
                      <p className="font-medium text-xs">
                        {exam.startTime} - {exam.endTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {exam.status === "active" && (
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Take Exam
                      </Button>
                    )}
                    {exam.status === "draft" && (
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Edit Exam
                      </Button>
                    )}
                    {exam.status === "completed" && (
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Results
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plagiarism" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Plagiarism Detection Reports</h2>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Run New Check
            </Button>
          </div>

          <div className="space-y-4">
            {plagiarismReports.map((report) => (
              <Card
                key={report.id}
                className={`border-l-4 ${
                  report.status === "clean"
                    ? "border-l-green-500"
                    : report.status === "suspicious"
                      ? "border-l-yellow-500"
                      : "border-l-red-500"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.studentName}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      <span className={`font-bold text-lg ${getSimilarityColor(report.similarityScore)}`}>
                        {report.similarityScore}%
                      </span>
                    </div>
                  </div>
                  <CardDescription>{report.assignment}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Submission Date:</span>
                      <span className="font-medium">{report.submissionDate}</span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Similarity Progress:</p>
                      <Progress value={report.similarityScore} className="h-2" />
                    </div>

                    {report.sources.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Similar Sources:</p>
                        <div className="flex flex-wrap gap-2">
                          {report.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                      {report.status !== "clean" && (
                        <Button size="sm" variant="outline">
                          <Shield className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Course Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.coursePerformance.map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{course.course}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={course.average} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{course.average}%</span>
                          <TrendingUp
                            className={`h-4 w-4 ${
                              course.trend === "up"
                                ? "text-green-500"
                                : course.trend === "down"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.studentProgress.map((student, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{student.student}</span>
                        <span className="text-sm text-gray-600">Grade: {student.grade}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={student.completion} className="flex-1 h-2" />
                        <span className="text-sm">{student.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Topic Difficulty Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analyticsData.difficultyAnalysis.map((topic, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-3">{topic.topic}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Difficulty Level:</span>
                        <span className="font-medium">{topic.difficulty}/10</span>
                      </div>
                      <Progress value={topic.difficulty * 10} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Pass Rate:</span>
                        <span className="font-medium text-green-600">{topic.passRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="peer-review" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Peer Review System</h2>
            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
              <DialogTrigger asChild>
                <Button>Assign Review</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Assign Peer Review</DialogTitle>
                  <DialogDescription>Assign a student to review another student's project.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project">Project</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iot-system">Smart Home IoT System</SelectItem>
                        <SelectItem value="audio-processor">Digital Audio Processor</SelectItem>
                        <SelectItem value="robotic-arm">Robotic Arm Controller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reviewer">Reviewer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reviewee">Reviewee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reviewee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lisa">Lisa Wang</SelectItem>
                        <SelectItem value="alex">Alex Chen</SelectItem>
                        <SelectItem value="emma">Emma Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsReviewOpen(false)}>
                    Assign Review
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {peerReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.project}</CardTitle>
                    <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                  </div>
                  <CardDescription>
                    {review.reviewer} reviewing {review.reviewee}'s work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Due Date:</span>
                      <span className="font-medium">{review.dueDate}</span>
                    </div>

                    {review.status === "completed" && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Score:</span>
                          <span className="font-medium text-green-600">{review.score}/100</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Feedback:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded">{review.feedback}</p>
                        </div>
                      </>
                    )}

                    <div className="flex gap-2">
                      {review.status === "pending" && (
                        <Button size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Start Review
                        </Button>
                      )}
                      {review.status === "completed" && (
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Review
                        </Button>
                      )}
                      {review.status === "overdue" && (
                        <Button size="sm" variant="destructive">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning-paths" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Personalized Learning Paths</h2>
            <Button variant="outline">
              <Brain className="h-4 w-4 mr-2" />
              Generate Path
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <Badge className={getDifficultyColor(path.difficulty)}>{path.difficulty}</Badge>
                  </div>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="font-medium">{path.duration}</span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Completion Rate:</span>
                        <span className="font-medium">{path.completionRate}%</span>
                      </div>
                      <Progress value={path.completionRate} className="h-2" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Courses:</p>
                      <div className="flex flex-wrap gap-2">
                        {path.courses.map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Prerequisites:</p>
                      <div className="flex flex-wrap gap-2">
                        {path.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Path
                      </Button>
                      <Button size="sm" variant="outline">
                        <Target className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
