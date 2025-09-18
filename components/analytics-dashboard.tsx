"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
} from "lucide-react"

interface MetricCard {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
}

interface ChartData {
  name: string
  value: number
  color: string
}

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("month")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const metrics: MetricCard[] = [
    {
      title: "Total Students",
      value: "1,247",
      change: 8.2,
      trend: "up",
      icon: <Users className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Active Courses",
      value: "42",
      change: 2.1,
      trend: "up",
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Average GPA",
      value: "8.4",
      change: -0.3,
      trend: "down",
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Graduation Rate",
      value: "94.2%",
      change: 1.8,
      trend: "up",
      icon: <Award className="h-6 w-6 text-orange-600" />,
    },
  ]

  const enrollmentData: ChartData[] = [
    { name: "B.Tech", value: 856, color: "#3b82f6" },
    { name: "M.Tech", value: 284, color: "#10b981" },
    { name: "Ph.D", value: 107, color: "#f59e0b" },
  ]

  const performanceData: ChartData[] = [
    { name: "Excellent (9-10)", value: 312, color: "#10b981" },
    { name: "Good (8-9)", value: 487, color: "#3b82f6" },
    { name: "Average (7-8)", value: 298, color: "#f59e0b" },
    { name: "Below Average (<7)", value: 150, color: "#ef4444" },
  ]

  const courseCompletionData = [
    { course: "Digital Signal Processing", completion: 92, enrolled: 156, completed: 143 },
    { course: "Microprocessors", completion: 88, enrolled: 134, completed: 118 },
    { course: "Electronics Lab", completion: 96, enrolled: 178, completed: 171 },
    { course: "Circuit Analysis", completion: 85, enrolled: 142, completed: 121 },
    { course: "VLSI Design", completion: 79, enrolled: 98, completed: 77 },
  ]

  const systemHealth = [
    { component: "Database", status: "healthy", uptime: "99.9%", lastCheck: "2 min ago" },
    { component: "Authentication", status: "healthy", uptime: "99.8%", lastCheck: "1 min ago" },
    { component: "File Storage", status: "warning", uptime: "98.2%", lastCheck: "5 min ago" },
    { component: "Email Service", status: "healthy", uptime: "99.5%", lastCheck: "3 min ago" },
    { component: "Backup System", status: "healthy", uptime: "100%", lastCheck: "10 min ago" },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : metric.trend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    ) : (
                      <div className="h-4 w-4 bg-gray-400 rounded-full mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : metric.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Student Enrollment Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollmentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <Progress value={(item.value / 1247) * 100} className="h-2" />
                        </div>
                        <span className="font-bold text-lg">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <Progress value={(item.value / 1247) * 100} className="h-2" />
                        </div>
                        <span className="font-bold text-lg">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Trends</CardTitle>
              <CardDescription>Key performance indicators over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Student Satisfaction</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">4.6/5.0</p>
                  <p className="text-sm text-gray-600 mt-1">+0.2 from last semester</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Faculty Rating</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">4.4/5.0</p>
                  <p className="text-sm text-gray-600 mt-1">+0.1 from last semester</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg">Course Completion</h3>
                  <p className="text-3xl font-bold text-purple-600 mt-2">88.2%</p>
                  <p className="text-sm text-gray-600 mt-1">-1.3% from last semester</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
              <CardDescription>Student completion rates by course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseCompletionData.map((course, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{course.course}</h3>
                      <Badge variant="outline">{course.completion}%</Badge>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {course.completed} of {course.enrolled} students completed
                      </span>
                      <span className="text-sm font-medium">{course.enrolled - course.completed} pending</span>
                    </div>
                    <Progress value={course.completion} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Health Monitor</CardTitle>
              <CardDescription>Real-time system component status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(system.status)}
                      <div>
                        <h3 className="font-medium">{system.component}</h3>
                        <p className="text-sm text-gray-600">Last checked: {system.lastCheck}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">Uptime: {system.uptime}</p>
                        <Badge className={getStatusColor(system.status)}>{system.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
