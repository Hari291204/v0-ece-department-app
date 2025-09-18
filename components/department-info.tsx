"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Search,
  Building,
  GraduationCap,
  Briefcase,
  Globe,
  ChevronRight,
  CheckCircle,
} from "lucide-react"

interface Faculty {
  id: string
  name: string
  title: string
  email: string
  phone: string
  office: string
  specializations: string[]
  education: string[]
  researchInterests: string[]
  publications: number
  image: string
}

interface Course {
  id: string
  code: string
  name: string
  credits: number
  prerequisites: string[]
  description: string
  semester: string[]
  instructor: string
  level: "undergraduate" | "graduate"
}

interface News {
  id: string
  title: string
  summary: string
  content: string
  date: string
  author: string
  category: "research" | "academic" | "event" | "achievement"
  image?: string
}

interface Program {
  id: string
  name: string
  degree: string
  duration: string
  description: string
  requirements: string[]
  careerOutcomes: string[]
}

export default function DepartmentInfo() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [facultyFilter, setFacultyFilter] = useState("all")

  // Mock data
  const faculty: Faculty[] = [
    {
      id: "1",
      name: "Dr. Sarah Smith",
      title: "Professor & Department Head",
      email: "sarah.smith@university.edu",
      phone: "(555) 123-4567",
      office: "Engineering Building 301",
      specializations: ["Digital Signal Processing", "Machine Learning", "Biomedical Engineering"],
      education: ["Ph.D. Electrical Engineering - MIT", "M.S. Electrical Engineering - Stanford"],
      researchInterests: ["Neural Networks", "Medical Imaging", "Signal Processing"],
      publications: 85,
      image: "/professional-woman-professor.png",
    },
    {
      id: "2",
      name: "Dr. Michael Johnson",
      title: "Associate Professor",
      email: "michael.johnson@university.edu",
      phone: "(555) 123-4568",
      office: "Engineering Building 205",
      specializations: ["Computer Architecture", "Embedded Systems", "VLSI Design"],
      education: ["Ph.D. Computer Engineering - UC Berkeley", "M.S. Computer Science - CMU"],
      researchInterests: ["Processor Design", "IoT Systems", "Hardware Security"],
      publications: 62,
      image: "/professional-professor.png",
    },
    {
      id: "3",
      name: "Dr. Emily Davis",
      title: "Assistant Professor",
      email: "emily.davis@university.edu",
      phone: "(555) 123-4569",
      office: "Engineering Building 180",
      specializations: ["Control Systems", "Robotics", "Automation"],
      education: ["Ph.D. Control Systems - Georgia Tech", "M.S. Mechanical Engineering - Caltech"],
      researchInterests: ["Autonomous Systems", "Industrial Automation", "AI in Robotics"],
      publications: 34,
      image: "/professional-woman-professor-engineering.jpg",
    },
  ]

  const courses: Course[] = [
    {
      id: "1",
      code: "ECE 101",
      name: "Introduction to Electrical and Computer Engineering",
      credits: 3,
      prerequisites: ["MATH 140"],
      description:
        "Fundamental concepts in electrical and computer engineering including circuit analysis, digital logic, and programming basics.",
      semester: ["Fall", "Spring"],
      instructor: "Dr. Smith",
      level: "undergraduate",
    },
    {
      id: "2",
      code: "ECE 250",
      name: "Circuit Analysis",
      credits: 4,
      prerequisites: ["ECE 101", "MATH 241"],
      description:
        "Analysis of linear circuits using nodal and mesh analysis, Thevenin and Norton equivalents, and AC circuit analysis.",
      semester: ["Fall", "Spring"],
      instructor: "Dr. Johnson",
      level: "undergraduate",
    },
    {
      id: "3",
      code: "ECE 401",
      name: "Digital Signal Processing",
      credits: 3,
      prerequisites: ["ECE 300", "MATH 340"],
      description: "Discrete-time signals and systems, z-transforms, digital filter design, and FFT algorithms.",
      semester: ["Fall"],
      instructor: "Dr. Smith",
      level: "undergraduate",
    },
    {
      id: "4",
      code: "ECE 550",
      name: "Advanced Machine Learning",
      credits: 3,
      prerequisites: ["ECE 450", "MATH 415"],
      description:
        "Deep learning architectures, neural networks, and advanced machine learning algorithms for engineering applications.",
      semester: ["Spring"],
      instructor: "Dr. Davis",
      level: "graduate",
    },
  ]

  const news: News[] = [
    {
      id: "1",
      title: "ECE Department Receives $2M NSF Grant for AI Research",
      summary:
        "The department has been awarded a significant grant to advance artificial intelligence research in healthcare applications.",
      content:
        "The National Science Foundation has awarded our department a $2 million grant to develop AI-powered diagnostic tools for medical imaging. This three-year project will be led by Dr. Sarah Smith and involves collaboration with the Medical School.",
      date: "2024-11-01",
      author: "Department Communications",
      category: "research",
      image: "/research-laboratory-ai-medical.jpg",
    },
    {
      id: "2",
      title: "Student Team Wins National Robotics Competition",
      summary: "Our undergraduate robotics team placed first in the IEEE National Robotics Challenge.",
      content:
        "A team of five ECE undergraduates, mentored by Dr. Emily Davis, won first place in the autonomous navigation category at the IEEE National Robotics Challenge. The competition featured 150 teams from universities across the country.",
      date: "2024-10-28",
      author: "Student Affairs",
      category: "achievement",
      image: "/robotics-competition-students-award.jpg",
    },
    {
      id: "3",
      title: "Fall 2024 Industry Career Fair",
      summary: "Join us for our annual career fair featuring top technology companies and engineering firms.",
      content:
        "The ECE Department will host its annual career fair on December 5th, 2024. Over 50 companies including Google, Apple, Intel, and Boeing will be recruiting our students for internships and full-time positions.",
      date: "2024-10-25",
      author: "Career Services",
      category: "event",
      image: "/career-fair-technology-companies.jpg",
    },
  ]

  const programs: Program[] = [
    {
      id: "1",
      name: "Bachelor of Science in Electrical Engineering",
      degree: "B.S.E.E.",
      duration: "4 years",
      description:
        "Comprehensive undergraduate program covering circuit analysis, electronics, power systems, and signal processing.",
      requirements: ["128 credit hours", "Capstone project", "Internship or co-op experience"],
      careerOutcomes: ["Power Systems Engineer", "Electronics Designer", "Control Systems Engineer", "R&D Engineer"],
    },
    {
      id: "2",
      name: "Bachelor of Science in Computer Engineering",
      degree: "B.S.C.E.",
      duration: "4 years",
      description: "Interdisciplinary program combining electrical engineering and computer science fundamentals.",
      requirements: ["128 credit hours", "Senior design project", "Programming proficiency"],
      careerOutcomes: ["Software Engineer", "Hardware Designer", "Systems Architect", "Embedded Systems Developer"],
    },
    {
      id: "3",
      name: "Master of Science in Electrical and Computer Engineering",
      degree: "M.S.E.C.E.",
      duration: "2 years",
      description: "Advanced graduate program with specialization tracks in various ECE disciplines.",
      requirements: ["30 credit hours", "Thesis or project option", "Comprehensive exam"],
      careerOutcomes: ["Senior Engineer", "Research Scientist", "Technical Lead", "Engineering Manager"],
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = courseFilter === "all" || course.level === courseFilter
    return matchesSearch && matchesFilter
  })

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specializations.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "research":
        return "bg-blue-100 text-blue-800"
      case "academic":
        return "bg-green-100 text-green-800"
      case "event":
        return "bg-purple-100 text-purple-800"
      case "achievement":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <GraduationCap className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold">Department of Electrical & Computer Engineering</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advancing the frontiers of technology through innovative research, exceptional education, and industry
              collaboration.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>25 Faculty Members</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>800+ Students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>Top 20 Ranked Program</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>About Our Department</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    The Department of Electrical and Computer Engineering at our university is a leading center for
                    education and research in electrical engineering, computer engineering, and related fields. We offer
                    comprehensive undergraduate and graduate programs that prepare students for successful careers in
                    industry, academia, and entrepreneurship.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our faculty are internationally recognized experts in their fields, conducting cutting-edge research
                    in areas such as artificial intelligence, robotics, power systems, communications, and biomedical
                    engineering. We maintain strong partnerships with industry leaders and government agencies.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">25</div>
                      <div className="text-sm text-muted-foreground">Faculty Members</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">800+</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Courses Offered</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">$15M</div>
                      <div className="text-sm text-muted-foreground">Research Funding</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Engineering Building, University Campus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">(555) 123-4500</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">info@ece.university.edu</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent News & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {news.slice(0, 3).map((item) => (
                    <div key={item.id} className="space-y-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="space-y-2">
                        <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                        <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.date}</span>
                          <Button variant="ghost" size="sm">
                            Read More <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Faculty Directory</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search faculty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredFaculty.map((member) => (
                <Card key={member.id}>
                  <CardHeader className="text-center">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        <span>{member.office}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specializations.map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{member.publications} Publications</span>
                      <Button variant="ghost" size="sm">
                        View Profile <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Academic Programs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer comprehensive undergraduate and graduate programs designed to prepare students for leadership
                roles in technology and engineering.
              </p>
            </div>

            <div className="grid gap-6">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{program.name}</CardTitle>
                        <CardDescription className="text-lg">
                          {program.degree} • {program.duration}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {program.degree.includes("B.S") ? "Undergraduate" : "Graduate"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{program.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          Requirements
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {program.requirements.map((req, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                          Career Outcomes
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {program.careerOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Advisor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Course Catalog</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Levels</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{course.code}</span>
                          <span>-</span>
                          <span>{course.name}</span>
                        </CardTitle>
                        <CardDescription>
                          {course.credits} Credits • {course.semester.join(", ")} • {course.instructor}
                        </CardDescription>
                      </div>
                      <Badge variant={course.level === "graduate" ? "default" : "secondary"}>{course.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                    {course.prerequisites.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Prerequisites: </span>
                        <span className="text-sm text-muted-foreground">{course.prerequisites.join(", ")}</span>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Syllabus
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

          <TabsContent value="research" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Research Areas</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our faculty and students conduct cutting-edge research across multiple disciplines, pushing the
                boundaries of technology and engineering.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span>Artificial Intelligence & Machine Learning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Advanced research in neural networks, deep learning, computer vision, and AI applications in
                    healthcare and autonomous systems.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Neural Networks</Badge>
                    <Badge variant="outline">Computer Vision</Badge>
                    <Badge variant="outline">Natural Language Processing</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <span>Robotics & Automation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Development of autonomous robots, industrial automation systems, and human-robot interaction
                    technologies.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Autonomous Navigation</Badge>
                    <Badge variant="outline">Industrial Robotics</Badge>
                    <Badge variant="outline">Human-Robot Interaction</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    <span>Biomedical Engineering</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Medical device development, biosignal processing, and healthcare technology solutions for improved
                    patient outcomes.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Medical Imaging</Badge>
                    <Badge variant="outline">Biosensors</Badge>
                    <Badge variant="outline">Telemedicine</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-orange-500" />
                    <span>Power Systems & Energy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Smart grid technologies, renewable energy systems, and power electronics for sustainable energy
                    solutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Smart Grids</Badge>
                    <Badge variant="outline">Renewable Energy</Badge>
                    <Badge variant="outline">Power Electronics</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Department News</h2>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All News
              </Button>
            </div>

            <div className="space-y-6">
              {news.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.summary}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">By {item.author}</span>
                          <Button variant="ghost">
                            Read Full Article <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
