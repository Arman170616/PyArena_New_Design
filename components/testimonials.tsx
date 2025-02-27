import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Testimonials() {
  // This would typically come from a database or API
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Developer",
      content:
        "PYARENA helped me transition from a complete beginner to a professional developer in just 6 months. The courses are well-structured and the instructors are incredibly knowledgeable.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Data Analyst",
      content:
        "The data science courses on PYARENA are exceptional. I was able to apply what I learned immediately in my job, which led to a promotion within 3 months!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Web Designer",
      content:
        "As someone who was struggling to learn web design on my own, PYARENA's structured approach and supportive community made all the difference. Highly recommended!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">What Our Students Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our students who have transformed their careers through PYARENA
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

