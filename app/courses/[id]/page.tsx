import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, BookOpen, Award, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CoursePage({ params }: { params: { id: string } }) {
  // This would typically come from a database or API based on the ID
  const course = {
    id: Number.parseInt(params.id),
    title: "Python for Beginners",
    description: "Learn Python programming from scratch with hands-on projects.",
    longDescription:
      "This comprehensive course is designed for absolute beginners who want to learn Python programming. You'll start with the basics and gradually move to more advanced topics, building real-world projects along the way. By the end of this course, you'll have a solid foundation in Python programming and be ready to tackle more advanced topics or specialize in areas like web development, data science, or automation.",
    category: "Programming",
    subCategory: "Python",
    image: "/placeholder.svg?height=400&width=800",
    price: 49.99,
    duration: "10 weeks",
    lessons: 42,
    level: "Beginner",
    instructors: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Senior Python Developer",
        bio: "John has over 10 years of experience in Python development and has worked with companies like Google and Microsoft.",
      },
      {
        id: 2,
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=100&width=100",
        role: "Data Scientist",
        bio: "Jane specializes in data science and machine learning with Python. She has a PhD in Computer Science and has published several research papers.",
      },
    ],
    curriculum: [
      {
        title: "Getting Started with Python",
        lessons: [
          "Introduction to Python and Setup",
          "Python Syntax and Basic Concepts",
          "Variables and Data Types",
          "Working with Numbers and Strings",
        ],
      },
      {
        title: "Control Flow",
        lessons: ["Conditional Statements", "Loops in Python", "Functions and Modules", "Error Handling"],
      },
      {
        title: "Data Structures",
        lessons: ["Lists and Tuples", "Dictionaries and Sets", "List Comprehensions", "Working with Files"],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Michael Johnson",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "2023-10-15",
        comment:
          "This course is amazing! I had no programming experience before, but the instructor explains everything so clearly. I'm now building my own Python applications.",
      },
      {
        id: 2,
        user: "Sarah Williams",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4,
        date: "2023-09-22",
        comment:
          "Great course for beginners! The projects are practical and helped me understand how to apply Python in real-world scenarios. Would have liked more advanced content towards the end.",
      },
      {
        id: 3,
        user: "David Lee",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "2023-11-05",
        comment:
          "The instructors are knowledgeable and responsive. Whenever I had questions, they would respond quickly in the discussion forum. Highly recommended!",
      },
    ],
  }

  return (
    <div className="container px-4 py-8 md:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/courses">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative mb-6">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <Badge className="absolute top-4 left-4">{course.category}</Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{course.level}</span>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="prose max-w-none">
                <p className="text-lg mb-4">{course.longDescription}</p>
                <h3 className="text-xl font-bold mt-6 mb-3">What You'll Learn</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Python fundamentals and syntax</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Object-oriented programming concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Working with data structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>File handling and error management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Building real-world Python applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Problem-solving with Python</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="curriculum">
              <div className="space-y-6">
                {course.curriculum.map((section, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 font-medium">{section.title}</div>
                    <ul className="divide-y">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="p-4 flex items-center">
                          <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="instructors">
              <div className="space-y-6">
                {course.instructors.map((instructor) => (
                  <div key={instructor.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={instructor.avatar} alt={instructor.name} />
                      <AvatarFallback>
                        {instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{instructor.name}</h3>
                      <p className="text-muted-foreground mb-2">{instructor.role}</p>
                      <p>{instructor.bio}</p>
                      <Button variant="link" asChild className="p-0 h-auto mt-2">
                        <Link href={`/instructors/${instructor.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                {course.reviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={review.avatar} alt={review.user} />
                        <AvatarFallback>{review.user.split(" ")[0][0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-4">${course.price}</div>
              <Button className="w-full mb-4">Enroll Now</Button>
              <Button variant="outline" className="w-full mb-6">
                Add to Wishlist
              </Button>

              <div className="space-y-4">
                <h3 className="font-medium">This course includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{course.lessons} on-demand video lessons</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Access to community forum</span>
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

