import Link from "next/link"
import { ArrowLeft, Mail, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InstructorPage({ params }: { params: { id: string } }) {
  // This would typically come from a database or API based on the ID
  const instructor = {
    id: Number.parseInt(params.id),
    name: "John Doe",
    role: "Senior Python Developer",
    bio: "John has over 10 years of experience in Python development and has worked with companies like Google and Microsoft. He is passionate about teaching and has helped thousands of students learn programming through his courses.",
    longBio: "John started his career as a software engineer at a small startup before moving to larger tech companies. He has contributed to several open-source projects and has spoken at numerous tech conferences around the world. His teaching philosophy focuses on practical, hands-on learning with real-world examples. When not coding or teaching, John enjoys hiking and playing chess.",
    avatar: "/placeholder.svg?height=300&width=300",
    email: "john.doe@example.com",
    website: "https://johndoe.example.com",
    social: {
      twitter: "johndoe",
      github: "johndoe",
      linkedin: "johndoe"
    },
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Stanford University",
        year: "2010-2012"
      },
      {
        degree: "Bachelor of Science in Computer Engineering",
        institution: "MIT",
        year: "2006-2010"
      }
    ],
    experience: [
      {
        position: "Senior Software Engineer",
        company: "Google",
        year: "2018-2022"
      },
      {
        position: "Software Engineer",
        company: "Microsoft",
        year: "2012-2018"
      }
    ],
    courses: [
      {
        id: 1,
        title: "Python for Beginners",
        description: "Learn Python programming from scratch with hands-on projects.",
        image: "/placeholder.svg?height=150&width=250",
        students: 1245,
        rating: 4.8
      },
      {
        id: 2,
        title: "Advanced Python Programming",
        description: "Take your Python skills to the next level with advanced concepts and techniques.",
        image: "/placeholder.svg?height=150&width=250",
        students: 876,
        rating: 4.9
      }
    ],
    specialties: ["Python", "Data Structures", "Algorithms", "Web Development", "Machine Learning"],
    rating: 4.9,
    reviewCount: 156,
    reviews: [
      {
        id: 1,
        user: "Michael Johnson",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "2023-10-15",
        comment: "John is an excellent instructor! His explanations are clear and he's always available to answer questions. I learned so much from his Python course."
      },
      {
        id: 2,
        user: "Sarah Williams",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "2023-09-22",
        comment: "The best programming instructor I've ever had. John has a way of making complex concepts easy to understand. Highly recommended!"
      },
      {
        id: 3,
        user: "David Lee",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4,
        date: "2023-11-05",
        comment: "Great instructor with deep knowledge of Python. The course material was well-structured and the projects were challenging but doable."
      }
    ]
  }

  return (
    <div className="container px-4 py-8 md:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/instructors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Instructors
        </Link>
      </Button>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src={instructor.avatar} alt={instructor.name} />
                <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{instructor.name}</CardTitle>
              <p className="text-muted-foreground">{instructor.role}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
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
                  <span>{instructor.rating} ({instructor.reviewCount} reviews)</span>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${instructor.email}`} className="text-sm hover:underline">
                        {instructor.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={instructor.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                        {instructor.website}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">{specialty}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Social Media</h3>
                  <div className="flex space-x-2">
                    <a href={`https://twitter.com/${instructor.social.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-muted/80">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href={`https://github.com/${instructor.social.github}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-muted/80">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c\
                          0-6.627-5.373-12-12-12" />
                      </svg>
                    </a>

                    <a href={`https://linkedin.com/in/${instructor.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-muted/80">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 2H2c-1.1 0-2 .9-2 2v20h7v-7H4V9h5V6.75C9 4.27 10.27 2 12.75 2H22v0z" />
                        <circle cx="5.5" cy="5.5" r="2.5" />
                        <path d="M16 16h-3v6h-3v-6h-1.5v-2.25c0-1.47-.28-2.75-2.25-2.75-1.97 0-2.25 1.28-2.25 2.75V16H4v-7h3v1c.5-.75 1.5-1.5 3-1.5s2.5.75 3 1.5v-1h3v7z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}