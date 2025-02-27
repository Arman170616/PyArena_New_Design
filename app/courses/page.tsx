"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Course {
  id: number
  title: string
  description: string
  category_name: string
  subcategory_name: string
  image: string
  price: number
  level: string
  duration: string
  instructors: Array<{
    id: number
    name: string
    occupation: string
  }>
  average_rating: number
  review_count: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/courses/list/")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        setCourses(data.results)

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.results.map((course: Course) => course.category_name)))
        setCategories(["All Categories", ...uniqueCategories])

        setIsLoading(false)
      } catch (err) {
        setError("Failed to load courses. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (isLoading) {
    return <div className="container px-4 py-8 md:px-6 lg:px-8">Loading courses...</div>
  }

  if (error) {
    return <div className="container px-4 py-8 md:px-6 lg:px-8">Error: {error}</div>
  }

  return (
    <div className="container px-4 py-8 md:px-6 lg:px-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Courses</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Search</h3>
            <Input placeholder="Search courses..." />
          </div>

          <div>
            <h3 className="font-medium mb-2">Category</h3>
            <Select defaultValue="All Categories">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="font-medium mb-2">Sub Category</h3>
            <Select defaultValue="All">
              <SelectTrigger>
                <SelectValue placeholder="Select sub-category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {/* You can populate this dynamically based on the selected category */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col h-full">
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg?height=200&width=300"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3">{course.category_name}</Badge>
                </div>
                <CardHeader className="flex-1">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span>Instructors: {course.instructors.map((i) => i.name).join(", ")}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="flex items-center mr-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(course.average_rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                    <span>
                      {course.average_rating.toFixed(1)} ({course.review_count} reviews)
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
      </div>
    </div>
  )
}

