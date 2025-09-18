"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  BookOpen,
  Users,
  GraduationCap,
  Building,
  LogOut,
  MessageCircle,
  Wrench,
  Brain,
  Settings,
  BarChart3,
  Shield,
} from "lucide-react"
import StudentDashboard from "@/components/student-dashboard"
import TeacherDashboard from "@/components/teacher-dashboard"

export default function HomePage() {
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogin = (type: "student" | "teacher") => {
    setUserType(type)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUserType(null)
    setIsLoggedIn(false)
    setShowLogoutDialog(false)
  }

  const LogoutDialog = () => (
    <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <LogOut className="h-5 w-5 text-primary" />
            <span>Confirm Logout</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You will need to enter your credentials again to access the portal.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 justify-end mt-4">
          <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">ECE Portal</h1>
            </div>
            <p className="text-muted-foreground">Electronics & Computer Engineering Department</p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student Login</TabsTrigger>
              <TabsTrigger value="teacher">Teacher Login</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Student Portal</span>
                  </CardTitle>
                  <CardDescription>Access your courses, grades, and assignments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input id="student-id" placeholder="Enter your student ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input id="student-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button className="w-full" onClick={() => handleLogin("student")}>
                    Login as Student
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teacher">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Teacher Portal</span>
                  </CardTitle>
                  <CardDescription>Manage courses, students, and grades</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-id">Teacher ID</Label>
                    <Input id="teacher-id" placeholder="Enter your teacher ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Input id="teacher-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button className="w-full" onClick={() => handleLogin("teacher")}>
                    Login as Teacher
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="/department">
                  <Building className="h-4 w-4 mr-2" />
                  Department
                </a>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="/communication">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Communication
                </a>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="/lab">
                  <Wrench className="h-4 w-4 mr-2" />
                  Lab Management
                </a>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="/academic-tools">
                  <Brain className="h-4 w-4 mr-2" />
                  Academic Tools
                </a>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="/admin">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </a>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </a>
              </Button>
            </div>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <a href="/security">
                <Shield className="h-4 w-4 mr-2" />
                Security Center
              </a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to appropriate dashboard based on user type
  if (userType === "student") {
    return (
      <>
        <StudentDashboard onLogout={() => setShowLogoutDialog(true)} />
        <LogoutDialog />
      </>
    )
  } else if (userType === "teacher") {
    return (
      <>
        <TeacherDashboard onLogout={() => setShowLogoutDialog(true)} />
        <LogoutDialog />
      </>
    )
  }

  return null
}
