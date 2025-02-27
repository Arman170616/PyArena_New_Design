import Image from "next/image"
import { CheckCircle } from "lucide-react"

export function TechMotivation() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Why Learn Tech Skills?</h2>
            <p className="text-muted-foreground">
              In today's digital world, tech skills are more valuable than ever. Whether you're looking to start a new
              career, advance in your current role, or simply expand your knowledge, learning tech skills can open doors
              to countless opportunities.
            </p>
            <ul className="space-y-2">
              {[
                "High demand across all industries",
                "Above-average salaries and benefits",
                "Remote work opportunities",
                "Continuous learning and growth",
                "Solve real-world problems with technology",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 h-72 w-72 bg-primary/10 rounded-full blur-3xl" />
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Tech professionals collaborating"
              width={600}
              height={400}
              className="relative rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

