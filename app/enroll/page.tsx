"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Course {
  id: number
  title: string
}

export default function EnrollPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    course: "",
    comment: "",
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/courses/list/")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        setCourses(data.results)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching courses:", err)
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again later.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleCourseChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, course: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://127.0.0.1:8000/api/courses/enroll/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Enrollment Successful",
          description: data.message || "Thank you for enrolling. We'll contact you soon with further details.",
        })
        router.push("/")
      } else {
        let errorMessage = "An error occurred. Please try again."
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.detail || errorMessage
        } catch (error) {
          console.error("Error parsing error response:", error)
        }
        toast({
          title: "Enrollment Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error during enrollment:", error)
      toast({
        title: "Enrollment Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="container px-4 py-8 md:px-6 lg:px-8">Loading courses...</div>
  }

  return (
    <div className="container px-4 py-8 md:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6">Enroll Now</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="phone_number">Phone Number *</Label>
          <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="course">Course *</Label>
          <Select onValueChange={handleCourseChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="comment">Comment</Label>
          <Textarea id="comment" name="comment" value={formData.comment} onChange={handleChange} rows={4} />
        </div>

        <Button type="submit">Submit Enrollment</Button>
      </form>
    </div>
  )
}

