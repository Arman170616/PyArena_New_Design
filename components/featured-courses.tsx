import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeaturedCourses() {
  // This would typically come from a database or API
  const courses = [
    {
      id: 1,
      title: "Python for Beginners",
      description: "Learn Python programming from scratch with hands-on projects.",
      category: "Programming",
      subCategory: "Python",
      image: "/placeholder.svg?height=200&width=300",
      instructors: ["John Doe", "Jane Smith"],
      rating: 4.8,
      reviewCount: 124,
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      description: "Master HTML, CSS, JavaScript and modern frameworks.",
      category: "Web Development",
      subCategory: "Full Stack",
      image: "/placeholder.svg?height=200&width=300",
      instructors: ["Alex Johnson"],
      rating: 4.9,
      reviewCount: 89,
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Learn data analysis, visualization and machine learning basics.",
      category: "Data Science",
      subCategory: "Analytics",
      image: "/placeholder.svg?height=200&width=300",
      instructors: ["Sarah Williams", "Michael Brown"],
      rating: 4.7,
      reviewCount: 56,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Courses</h2>
            <p className="text-muted-foreground">Explore our most popular tech courses</p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link href="/courses">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col h-full">
              <div className="relative">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 left-3">{course.category}</Badge>
              </div>
              <CardHeader className="flex-1">
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>Instructors: {course.instructors.join(", ")}</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="flex items-center mr-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <span>
                    {course.rating} ({course.reviewCount} reviews)
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/courses/${course.id}`}>View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

