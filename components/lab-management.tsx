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
import { Calendar, Clock, Users, Wrench, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface Equipment {
  id: string
  name: string
  type: string
  status: "available" | "in-use" | "maintenance" | "broken"
  location: string
  lastMaintenance: string
  nextMaintenance: string
}

interface LabBooking {
  id: string
  labName: string
  equipment: string
  bookedBy: string
  date: string
  time: string
  duration: string
  purpose: string
  status: "confirmed" | "pending" | "completed"
}

interface SafetyProtocol {
  id: string
  title: string
  category: string
  description: string
  lastUpdated: string
  mandatory: boolean
}

export default function LabManagement() {
  const [activeTab, setActiveTab] = useState("equipment")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isProtocolOpen, setIsProtocolOpen] = useState(false)

  const equipment: Equipment[] = [
    {
      id: "1",
      name: "Oscilloscope DS1054Z",
      type: "Measurement",
      status: "available",
      location: "Lab A-101",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-04-15",
    },
    {
      id: "2",
      name: "Function Generator",
      type: "Signal",
      status: "in-use",
      location: "Lab A-101",
      lastMaintenance: "2024-02-01",
      nextMaintenance: "2024-05-01",
    },
    {
      id: "3",
      name: "Power Supply Unit",
      type: "Power",
      status: "maintenance",
      location: "Lab A-102",
      lastMaintenance: "2024-03-01",
      nextMaintenance: "2024-06-01",
    },
    {
      id: "4",
      name: "Spectrum Analyzer",
      type: "Measurement",
      status: "available",
      location: "Lab A-102",
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-04-20",
    },
    {
      id: "5",
      name: "Logic Analyzer",
      type: "Digital",
      status: "broken",
      location: "Lab A-103",
      lastMaintenance: "2024-02-15",
      nextMaintenance: "2024-05-15",
    },
  ]

  const bookings: LabBooking[] = [
    {
      id: "1",
      labName: "Electronics Lab A-101",
      equipment: "Oscilloscope DS1054Z",
      bookedBy: "John Smith",
      date: "2024-03-20",
      time: "10:00",
      duration: "2 hours",
      purpose: "Circuit Analysis",
      status: "confirmed",
    },
    {
      id: "2",
      labName: "Digital Lab A-102",
      equipment: "Logic Analyzer",
      bookedBy: "Sarah Johnson",
      date: "2024-03-21",
      time: "14:00",
      duration: "3 hours",
      purpose: "FPGA Testing",
      status: "pending",
    },
    {
      id: "3",
      labName: "Power Lab A-103",
      equipment: "Power Supply Unit",
      bookedBy: "Mike Davis",
      date: "2024-03-22",
      time: "09:00",
      duration: "4 hours",
      purpose: "Power Electronics",
      status: "completed",
    },
  ]

  const safetyProtocols: SafetyProtocol[] = [
    {
      id: "1",
      title: "High Voltage Safety",
      category: "Electrical",
      description: "Procedures for working with high voltage equipment",
      lastUpdated: "2024-02-01",
      mandatory: true,
    },
    {
      id: "2",
      title: "Chemical Handling",
      category: "Chemical",
      description: "Safe handling of laboratory chemicals and solvents",
      lastUpdated: "2024-01-15",
      mandatory: true,
    },
    {
      id: "3",
      title: "Equipment Maintenance",
      category: "General",
      description: "Regular maintenance procedures for lab equipment",
      lastUpdated: "2024-02-10",
      mandatory: false,
    },
    {
      id: "4",
      title: "Emergency Procedures",
      category: "Safety",
      description: "Emergency evacuation and first aid procedures",
      lastUpdated: "2024-01-01",
      mandatory: true,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-use":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "maintenance":
        return <Wrench className="h-4 w-4 text-blue-500" />
      case "broken":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "in-use":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      case "broken":
        return "bg-red-100 text-red-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Lab Management</h1>
        <div className="flex gap-2">
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button>Book Equipment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Book Lab Equipment</DialogTitle>
                <DialogDescription>Schedule equipment usage for your lab work.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="lab">Laboratory</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select laboratory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lab-a101">Electronics Lab A-101</SelectItem>
                      <SelectItem value="lab-a102">Digital Lab A-102</SelectItem>
                      <SelectItem value="lab-a103">Power Lab A-103</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="equipment">Equipment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oscilloscope">Oscilloscope DS1054Z</SelectItem>
                      <SelectItem value="function-gen">Function Generator</SelectItem>
                      <SelectItem value="spectrum">Spectrum Analyzer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Textarea id="purpose" placeholder="Describe the purpose of equipment usage" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsBookingOpen(false)}>
                  Book Equipment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {["equipment", "bookings", "safety"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab === "equipment" && "Equipment"}
            {tab === "bookings" && "Bookings"}
            {tab === "safety" && "Safety Protocols"}
          </button>
        ))}
      </div>

      {activeTab === "equipment" && (
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    {getStatusIcon(item.status)}
                  </div>
                  <CardDescription>{item.type} Equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge className={getStatusColor(item.status)}>{item.status.replace("-", " ")}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Maintenance:</span>
                      <span className="text-sm">{item.lastMaintenance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Next Maintenance:</span>
                      <span className="text-sm">{item.nextMaintenance}</span>
                    </div>
                    <div className="pt-2">
                      <Button size="sm" className="w-full" disabled={item.status !== "available"}>
                        {item.status === "available" ? "Book Now" : "Unavailable"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{booking.labName}</CardTitle>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>
                <CardDescription>{booking.equipment}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Booked by</p>
                      <p className="font-medium">{booking.bookedBy}</p>
                    </div>
                  </div>
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
                      <p className="font-medium">{booking.time}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{booking.duration}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Purpose</p>
                  <p className="font-medium">{booking.purpose}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "safety" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Safety Protocols</h2>
            <Dialog open={isProtocolOpen} onOpenChange={setIsProtocolOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Add Protocol</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Safety Protocol</DialogTitle>
                  <DialogDescription>Create a new safety protocol for the laboratory.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Protocol Title</Label>
                    <Input id="title" placeholder="Enter protocol title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="chemical">Chemical</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Detailed protocol description" rows={4} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsProtocolOpen(false)}>
                    Add Protocol
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {safetyProtocols.map((protocol) => (
              <Card key={protocol.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {protocol.mandatory && <AlertTriangle className="h-5 w-5 text-red-500" />}
                      {protocol.title}
                    </CardTitle>
                    <Badge variant="outline">{protocol.category}</Badge>
                  </div>
                  <CardDescription>Last updated: {protocol.lastUpdated}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{protocol.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {protocol.mandatory && <Badge className="bg-red-100 text-red-800">Mandatory</Badge>}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
