"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// This would typically come from an API call
const courses = [
  { id: 1, title: "Python for Beginners" },
  { id: 2, title: "Web Development Bootcamp" },
  { id: 3, title: "Data Science Fundamentals" },
]

export default function EnrollPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    course: "",
    comment: "",
  })

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
      const response = await fetch("/api/courses/enroll/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Enrollment Successful",
          description: "Thank you for enrolling. We'll contact you soon with further details.",
        })
        router.push("/")
      } else {
        const errorData = await response.json()
        toast({
          title: "Enrollment Failed",
          description: errorData.message || "An error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Layout>
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6">Enroll Now</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
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
    </Layout>
  )
}

