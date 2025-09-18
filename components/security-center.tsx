"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key, Users, Activity, Settings, Download } from "lucide-react"

interface SecurityEvent {
  id: string
  type: "login" | "failed_login" | "permission_change" | "data_access" | "system_alert"
  user: string
  timestamp: string
  details: string
  severity: "low" | "medium" | "high" | "critical"
  status: "resolved" | "investigating" | "open"
}

interface UserSession {
  id: string
  user: string
  role: string
  loginTime: string
  lastActivity: string
  ipAddress: string
  device: string
  status: "active" | "idle" | "expired"
}

interface SecuritySetting {
  id: string
  category: string
  setting: string
  description: string
  enabled: boolean
  level: "basic" | "advanced" | "enterprise"
}

export default function SecurityCenter() {
  const [activeTab, setActiveTab] = useState("overview")
  const [is2FAOpen, setIs2FAOpen] = useState(false)

  const securityEvents: SecurityEvent[] = [
    {
      id: "1",
      type: "failed_login",
      user: "unknown",
      timestamp: "2024-03-20 14:30",
      details: "Multiple failed login attempts from IP 192.168.1.100",
      severity: "high",
      status: "investigating",
    },
    {
      id: "2",
      type: "permission_change",
      user: "admin",
      timestamp: "2024-03-20 13:15",
      details: "User permissions updated for john.smith@university.edu",
      severity: "medium",
      status: "resolved",
    },
    {
      id: "3",
      type: "data_access",
      user: "dr.smith",
      timestamp: "2024-03-20 12:45",
      details: "Bulk student data export performed",
      severity: "medium",
      status: "resolved",
    },
    {
      id: "4",
      type: "system_alert",
      user: "system",
      timestamp: "2024-03-20 11:20",
      details: "Unusual database query patterns detected",
      severity: "high",
      status: "open",
    },
  ]

  const userSessions: UserSession[] = [
    {
      id: "1",
      user: "john.smith",
      role: "Student",
      loginTime: "2024-03-20 09:00",
      lastActivity: "2024-03-20 14:30",
      ipAddress: "192.168.1.50",
      device: "Chrome/Windows",
      status: "active",
    },
    {
      id: "2",
      user: "dr.johnson",
      role: "Teacher",
      loginTime: "2024-03-20 08:30",
      lastActivity: "2024-03-20 14:25",
      ipAddress: "192.168.1.75",
      device: "Firefox/MacOS",
      status: "active",
    },
    {
      id: "3",
      user: "sarah.wilson",
      role: "Student",
      loginTime: "2024-03-20 10:15",
      lastActivity: "2024-03-20 13:45",
      ipAddress: "192.168.1.82",
      device: "Safari/iOS",
      status: "idle",
    },
    {
      id: "4",
      user: "admin",
      role: "Administrator",
      loginTime: "2024-03-20 07:45",
      lastActivity: "2024-03-20 14:35",
      ipAddress: "192.168.1.10",
      device: "Chrome/Linux",
      status: "active",
    },
  ]

  const securitySettings: SecuritySetting[] = [
    {
      id: "1",
      category: "Authentication",
      setting: "Two-Factor Authentication",
      description: "Require 2FA for all user accounts",
      enabled: true,
      level: "advanced",
    },
    {
      id: "2",
      category: "Authentication",
      setting: "Password Complexity",
      description: "Enforce strong password requirements",
      enabled: true,
      level: "basic",
    },
    {
      id: "3",
      category: "Access Control",
      setting: "Role-Based Permissions",
      description: "Restrict access based on user roles",
      enabled: true,
      level: "basic",
    },
    {
      id: "4",
      category: "Monitoring",
      setting: "Login Attempt Monitoring",
      description: "Track and alert on failed login attempts",
      enabled: true,
      level: "advanced",
    },
    {
      id: "5",
      category: "Data Protection",
      setting: "Data Encryption",
      description: "Encrypt sensitive data at rest and in transit",
      enabled: true,
      level: "enterprise",
    },
    {
      id: "6",
      category: "Session Management",
      setting: "Auto Session Timeout",
      description: "Automatically log out inactive users",
      enabled: true,
      level: "basic",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "investigating":
        return "bg-yellow-100 text-yellow-800"
      case "open":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "idle":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "login":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed_login":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "permission_change":
        return <Key className="h-4 w-4 text-blue-500" />
      case "data_access":
        return <Eye className="h-4 w-4 text-purple-500" />
      case "system_alert":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "basic":
        return "bg-blue-100 text-blue-800"
      case "advanced":
        return "bg-purple-100 text-purple-800"
      case "enterprise":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Security Center</h1>
        <div className="flex gap-2">
          <Dialog open={is2FAOpen} onOpenChange={setIs2FAOpen}>
            <DialogTrigger asChild>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Setup 2FA
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
                <DialogDescription>Add an extra layer of security to your account.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-xs text-gray-500">QR Code Placeholder</div>
                  </div>
                  <p className="text-sm text-gray-600">Scan this QR code with your authenticator app</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input id="verification-code" placeholder="Enter 6-digit code" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIs2FAOpen(false)}>
                  Enable 2FA
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Security Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Security Overview</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Security Score</p>
                    <p className="text-2xl font-bold text-green-600">94/100</p>
                    <p className="text-xs text-gray-500 mt-1">Excellent</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Threats</p>
                    <p className="text-2xl font-bold text-red-600">2</p>
                    <p className="text-xs text-gray-500 mt-1">Investigating</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                    <p className="text-2xl font-bold text-blue-600">247</p>
                    <p className="text-xs text-gray-500 mt-1">Current users</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">2FA Enabled</p>
                    <p className="text-2xl font-bold text-purple-600">78%</p>
                    <p className="text-xs text-gray-500 mt-1">Of all users</p>
                  </div>
                  <Lock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Security Activity</CardTitle>
              <CardDescription>Latest security events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{event.details}</p>
                        <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>User: {event.user}</span>
                        <span>Time: {event.timestamp}</span>
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Events Log</CardTitle>
              <CardDescription>Comprehensive security event monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getEventIcon(event.type)}
                          <span className="capitalize">{event.type.replace("_", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{event.user}</TableCell>
                      <TableCell className="max-w-xs truncate">{event.details}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      </TableCell>
                      <TableCell>{event.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active User Sessions</CardTitle>
              <CardDescription>Monitor and manage active user sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.user}</TableCell>
                      <TableCell>{session.role}</TableCell>
                      <TableCell>{session.loginTime}</TableCell>
                      <TableCell>{session.lastActivity}</TableCell>
                      <TableCell>{session.ipAddress}</TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Terminate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>Manage security settings and policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {securitySettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{setting.setting}</h3>
                        <Badge className={getLevelColor(setting.level)}>{setting.level}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Category: {setting.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch checked={setting.enabled} />
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
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
