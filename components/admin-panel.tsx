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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  DollarSign,
  FileText,
  Clock,
  MapPin,
  GraduationCap,
  Briefcase,
  Settings,
  Download,
  Upload,
  Search,
  Filter,
} from "lucide-react"

interface StudentRecord {
  id: string
  name: string
  studentId: string
  email: string
  program: string
  year: number
  gpa: number
  status: "active" | "graduated" | "suspended" | "transferred"
  enrollmentDate: string
  credits: number
}

interface FacultyWorkload {
  id: string
  name: string
  department: string
  teachingHours: number
  researchHours: number
  adminHours: number
  totalHours: number
  courses: string[]
  researchProjects: string[]
}

interface ResourceBooking {
  id: string
  resource: string
  type: "classroom" | "equipment" | "meeting-room"
  bookedBy: string
  date: string
  timeSlot: string
  duration: string
  purpose: string
  status: "confirmed" | "pending" | "cancelled"
}

interface BudgetItem {
  id: string
  category: string
  description: string
  allocated: number
  spent: number
  remaining: number
  lastUpdated: string
  status: "on-track" | "over-budget" | "under-utilized"
}

interface AlumniRecord {
  id: string
  name: string
  graduationYear: number
  degree: string
  currentPosition: string
  company: string
  location: string
  email: string
  linkedIn: string
  mentorshipAvailable: boolean
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("students")
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)

  const studentRecords: StudentRecord[] = [
    {
      id: "1",
      name: "John Smith",
      studentId: "ECE2021001",
      email: "john.smith@university.edu",
      program: "B.Tech ECE",
      year: 3,
      gpa: 8.5,
      status: "active",
      enrollmentDate: "2021-08-15",
      credits: 120,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      studentId: "ECE2020002",
      email: "sarah.johnson@university.edu",
      program: "M.Tech ECE",
      year: 2,
      gpa: 9.2,
      status: "active",
      enrollmentDate: "2020-08-15",
      credits: 45,
    },
    {
      id: "3",
      name: "Mike Davis",
      studentId: "ECE2019003",
      email: "mike.davis@university.edu",
      program: "B.Tech ECE",
      year: 4,
      gpa: 7.8,
      status: "graduated",
      enrollmentDate: "2019-08-15",
      credits: 160,
    },
    {
      id: "4",
      name: "Lisa Wang",
      studentId: "ECE2021004",
      email: "lisa.wang@university.edu",
      program: "B.Tech ECE",
      year: 3,
      gpa: 9.0,
      status: "active",
      enrollmentDate: "2021-08-15",
      credits: 115,
    },
  ]

  const facultyWorkload: FacultyWorkload[] = [
    {
      id: "1",
      name: "Dr. Smith",
      department: "ECE",
      teachingHours: 12,
      researchHours: 20,
      adminHours: 8,
      totalHours: 40,
      courses: ["DSP-301", "EL-201"],
      researchProjects: ["AI in Signal Processing", "IoT Security"],
    },
    {
      id: "2",
      name: "Prof. Davis",
      department: "ECE",
      teachingHours: 15,
      researchHours: 15,
      adminHours: 10,
      totalHours: 40,
      courses: ["MP-401", "CA-301"],
      researchProjects: ["Embedded Systems", "VLSI Design"],
    },
    {
      id: "3",
      name: "Dr. Johnson",
      department: "ECE",
      teachingHours: 10,
      researchHours: 25,
      adminHours: 5,
      totalHours: 40,
      courses: ["DD-201"],
      researchProjects: ["Machine Learning", "Computer Vision", "Robotics"],
    },
  ]

  const resourceBookings: ResourceBooking[] = [
    {
      id: "1",
      resource: "Classroom A-101",
      type: "classroom",
      bookedBy: "Dr. Smith",
      date: "2024-03-25",
      timeSlot: "09:00-11:00",
      duration: "2 hours",
      purpose: "DSP Lecture",
      status: "confirmed",
    },
    {
      id: "2",
      resource: "Conference Room B-205",
      type: "meeting-room",
      bookedBy: "Prof. Davis",
      date: "2024-03-26",
      timeSlot: "14:00-16:00",
      duration: "2 hours",
      purpose: "Faculty Meeting",
      status: "pending",
    },
    {
      id: "3",
      resource: "Lab Equipment Set-1",
      type: "equipment",
      bookedBy: "Research Team",
      date: "2024-03-27",
      timeSlot: "10:00-15:00",
      duration: "5 hours",
      purpose: "Research Experiment",
      status: "confirmed",
    },
  ]

  const budgetItems: BudgetItem[] = [
    {
      id: "1",
      category: "Equipment",
      description: "Lab Equipment Purchase",
      allocated: 500000,
      spent: 350000,
      remaining: 150000,
      lastUpdated: "2024-03-20",
      status: "on-track",
    },
    {
      id: "2",
      category: "Research",
      description: "Research Funding",
      allocated: 300000,
      spent: 320000,
      remaining: -20000,
      lastUpdated: "2024-03-19",
      status: "over-budget",
    },
    {
      id: "3",
      category: "Infrastructure",
      description: "Building Maintenance",
      allocated: 200000,
      spent: 80000,
      remaining: 120000,
      lastUpdated: "2024-03-18",
      status: "under-utilized",
    },
    {
      id: "4",
      category: "Faculty Development",
      description: "Training and Conferences",
      allocated: 150000,
      spent: 145000,
      remaining: 5000,
      lastUpdated: "2024-03-17",
      status: "on-track",
    },
  ]

  const alumniRecords: AlumniRecord[] = [
    {
      id: "1",
      name: "Alex Chen",
      graduationYear: 2020,
      degree: "B.Tech ECE",
      currentPosition: "Software Engineer",
      company: "Google",
      location: "California, USA",
      email: "alex.chen@gmail.com",
      linkedIn: "linkedin.com/in/alexchen",
      mentorshipAvailable: true,
    },
    {
      id: "2",
      name: "Emma Wilson",
      graduationYear: 2019,
      degree: "M.Tech ECE",
      currentPosition: "Hardware Engineer",
      company: "Intel",
      location: "Oregon, USA",
      email: "emma.wilson@intel.com",
      linkedIn: "linkedin.com/in/emmawilson",
      mentorshipAvailable: true,
    },
    {
      id: "3",
      name: "Raj Patel",
      graduationYear: 2018,
      degree: "B.Tech ECE",
      currentPosition: "Startup Founder",
      company: "TechStart Inc.",
      location: "Bangalore, India",
      email: "raj@techstart.com",
      linkedIn: "linkedin.com/in/rajpatel",
      mentorshipAvailable: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "confirmed":
      case "on-track":
        return "bg-green-100 text-green-800"
      case "pending":
      case "under-utilized":
        return "bg-yellow-100 text-yellow-800"
      case "graduated":
      case "transferred":
        return "bg-blue-100 text-blue-800"
      case "suspended":
      case "cancelled":
      case "over-budget":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Administrative Panel</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="students">Student Records</TabsTrigger>
          <TabsTrigger value="faculty">Faculty Workload</TabsTrigger>
          <TabsTrigger value="resources">Resource Booking</TabsTrigger>
          <TabsTrigger value="budget">Budget Tracking</TabsTrigger>
          <TabsTrigger value="alumni">Alumni Network</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Student Records Management</h2>
            <div className="flex gap-2">
              <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                <DialogTrigger asChild>
                  <Button>Add Student</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Enter student information to create a new record.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="student-name">Full Name</Label>
                        <Input id="student-name" placeholder="Enter full name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input id="student-id" placeholder="ECE2024001" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="student@university.edu" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="program">Program</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="btech">B.Tech ECE</SelectItem>
                            <SelectItem value="mtech">M.Tech ECE</SelectItem>
                            <SelectItem value="phd">Ph.D ECE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="year">Year</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1st Year</SelectItem>
                            <SelectItem value="2">2nd Year</SelectItem>
                            <SelectItem value="3">3rd Year</SelectItem>
                            <SelectItem value="4">4th Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="gpa">GPA</Label>
                        <Input id="gpa" type="number" step="0.1" placeholder="8.5" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="credits">Credits</Label>
                        <Input id="credits" type="number" placeholder="120" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => setIsAddStudentOpen(false)}>
                      Add Student
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentRecords.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.gpa}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
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

        <TabsContent value="faculty" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Faculty Workload Tracking</h2>
            <Button variant="outline">Generate Report</Button>
          </div>

          <div className="grid gap-4">
            {facultyWorkload.map((faculty) => (
              <Card key={faculty.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{faculty.name}</CardTitle>
                    <Badge variant="outline">{faculty.department}</Badge>
                  </div>
                  <CardDescription>Total Workload: {faculty.totalHours} hours/week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Teaching:</span>
                        <span className="font-medium">{faculty.teachingHours}h</span>
                      </div>
                      <Progress value={(faculty.teachingHours / faculty.totalHours) * 100} className="h-2" />
                      <div className="flex flex-wrap gap-1">
                        {faculty.courses.map((course, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Research:</span>
                        <span className="font-medium">{faculty.researchHours}h</span>
                      </div>
                      <Progress value={(faculty.researchHours / faculty.totalHours) * 100} className="h-2" />
                      <div className="flex flex-wrap gap-1">
                        {faculty.researchProjects.map((project, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Admin:</span>
                        <span className="font-medium">{faculty.adminHours}h</span>
                      </div>
                      <Progress value={(faculty.adminHours / faculty.totalHours) * 100} className="h-2" />
                      <div className="pt-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage Workload
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Resource Booking Management</h2>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button>New Booking</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Resource Booking</DialogTitle>
                  <DialogDescription>Book a classroom, equipment, or meeting room.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="resource-type">Resource Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classroom">Classroom</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="meeting-room">Meeting Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="resource-name">Resource</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classroom-a101">Classroom A-101</SelectItem>
                        <SelectItem value="lab-equipment">Lab Equipment Set-1</SelectItem>
                        <SelectItem value="conference-room">Conference Room B-205</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="booking-date">Date</Label>
                      <Input id="booking-date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time-slot">Time Slot</Label>
                      <Input id="time-slot" placeholder="09:00-11:00" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Textarea id="purpose" placeholder="Describe the purpose of booking" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsBookingOpen(false)}>
                    Create Booking
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {resourceBookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{booking.resource}</CardTitle>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                  <CardDescription>Booked by {booking.bookedBy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium">{booking.timeSlot}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-medium">{booking.duration}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Purpose</p>
                      <p className="font-medium">{booking.purpose}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Budget Tracking</h2>
            <Dialog open={isBudgetOpen} onOpenChange={setIsBudgetOpen}>
              <DialogTrigger asChild>
                <Button>Add Budget Item</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Budget Item</DialogTitle>
                  <DialogDescription>Create a new budget allocation item.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="budget-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="faculty">Faculty Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Enter description" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="allocated">Allocated Amount (₹)</Label>
                    <Input id="allocated" type="number" placeholder="500000" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsBudgetOpen(false)}>
                    Add Item
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {budgetItems.map((item) => (
              <Card
                key={item.id}
                className={`border-l-4 ${
                  item.status === "on-track"
                    ? "border-l-green-500"
                    : item.status === "over-budget"
                      ? "border-l-red-500"
                      : "border-l-yellow-500"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.category}</CardTitle>
                    <Badge className={getStatusColor(item.status)}>{item.status.replace("-", " ")}</Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Allocated</p>
                        <p className="font-bold text-lg text-blue-600">{formatCurrency(item.allocated)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Spent</p>
                        <p className="font-bold text-lg text-red-600">{formatCurrency(item.spent)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Remaining</p>
                        <p className={`font-bold text-lg ${item.remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(item.remaining)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Budget Utilization:</span>
                        <span className="font-medium">{Math.round((item.spent / item.allocated) * 100)}%</span>
                      </div>
                      <Progress value={(item.spent / item.allocated) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Updated: {item.lastUpdated}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Update Spending
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alumni" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Alumni Network</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search Alumni
              </Button>
              <Button>Add Alumni</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {alumniRecords.map((alumni) => (
              <Card key={alumni.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{alumni.name}</CardTitle>
                    <Badge variant="outline">Class of {alumni.graduationYear}</Badge>
                  </div>
                  <CardDescription>{alumni.degree}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">{alumni.currentPosition}</p>
                        <p className="text-sm text-gray-600">{alumni.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{alumni.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mentorship Available:</span>
                      <Badge
                        className={
                          alumni.mentorshipAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {alumni.mentorshipAvailable ? "Yes" : "No"}
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        View Profile
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
