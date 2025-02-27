import Link from "next/link"
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCourses } from "@/components/featured-courses"
import { Testimonials } from "@/components/testimonials"
import { TechMotivation } from "@/components/tech-motivation"
import { CompanyInfo } from "@/components/company-info"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-16 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Diverse Courses</h3>
              <p className="text-muted-foreground">
                Explore our wide range of tech courses designed for all skill levels.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">Learn from industry professionals with years of experience.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Recognized Certificates</h3>
              <p className="text-muted-foreground">Earn certificates that are recognized in the tech industry.</p>
            </div>
          </div>
        </section>

        <FeaturedCourses />
        <TechMotivation />
        <CompanyInfo />
        <Testimonials />

        <section className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students already learning on PYARENA
            </p>
            <Button asChild size="lg">
              <Link href="/enroll">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

