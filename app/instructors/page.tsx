import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function InstructorsPage() {
  // This would typically come from a database or API
  const instructors = [
    {
      id: 1,
      name: "John Doe",
      role: "Senior Python Developer",
      bio: "John has over 10 years of experience in Python development and has worked with companies like Google and Microsoft.",
      avatar: "/placeholder.svg?height=200&width=200",
      courses: ["Python for Beginners", "Advanced Python Programming"],
      specialties: ["Python", "Data Structures", "Algorithms"],
      rating: 4.9,
      reviewCount: 156,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Data Scientist",
      bio: "Jane specializes in data science and machine learning with Python. She has a PhD in Computer Science and has published several research papers.",
      avatar: "/placeholder.svg?height=200&width=200",
      courses: ["Python for Beginners", "Data Science Fundamentals"],
      specialties: ["Data Science", "Machine Learning", "Python"],
      rating: 4.8,
      reviewCount: 132,
    },
    {
      id: 3,
      name: "Alex Johnson",
      role: "Full Stack Developer",
      bio: "Alex is a full stack developer with expertise in modern web technologies. He has built numerous web applications for startups and enterprises.",
      avatar: "/placeholder.svg?height=200&width=200",
      courses: ["Web Development Bootcamp", "JavaScript Mastery"],
      specialties: ["JavaScript", "React", "Node.js"],
      rating: 4.9,
      reviewCount: 89,
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Data Analyst",
      bio: "Sarah is a data analyst with a background in statistics. She specializes in data visualization and business intelligence.",
      avatar: "/placeholder.svg?height=200&width=200",
      courses: ["Data Science Fundamentals", "Data Visualization with Python"],
      specialties: ["Data Analysis", "Visualization", "Statistics"],
      rating: 4.7,
      reviewCount: 78,
    },
    {
      id: 5,
      name: "Michael Brown",
      role: "Mobile Developer",
      bio: "Michael is a mobile app developer with expertise in React Native and Flutter. He has published several apps on the App Store and Google Play.",
      avatar: "/placeholder.svg?height=200&width=200",
      courses: ["Mobile App Development", "React Native Masterclass"],
      specialties: ["React Native", "Flutter", "Mobile Development"],
      rating: 4.8,
      reviewCount: 63,
    },
    {
      id: 6,
      name: "Emily Davis",
      role: "UI/UX Designer & Developer",
      bio: "Emily combines design and development skills to create beautiful and functional user interfaces. She has worked with numerous startups to improve their UX.",
      avatar: "/placeholder.svg?height=200&width=200",
      courses: ["Web Development Bootcamp", "UI/UX Design Principles"],
      specialties: ["UI Design", "UX Research", "Frontend Development"],
      rating: 4.9,
      reviewCount: 92,
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Our Instructors</h1>
      </div>

      <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
        Learn from industry experts with years of experience in their fields. Our instructors are passionate about
        teaching and committed to helping you succeed.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <Card key={instructor.id} className="flex flex-col h-full">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={instructor.avatar} alt={instructor.name} />
                <AvatarFallback>
                  {instructor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{instructor.name}</CardTitle>
              <CardDescription>{instructor.role}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4">{instructor.bio}</p>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Courses</h4>
                <ul className="space-y-1">
                  {instructor.courses.map((course, index) => (
                    <li key={index} className="text-sm">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(instructor.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <span className="text-sm">
                  {instructor.rating} ({instructor.reviewCount})
                </span>
              </div>
              <Button asChild size="sm">
                <Link href={`/instructors/${instructor.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

