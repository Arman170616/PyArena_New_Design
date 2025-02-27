import { Building, Mail, MapPin, Phone } from "lucide-react"

export function CompanyInfo() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">About PYARENA</h2>
            <div className="space-y-4">
              <p>
                PYARENA is a leading e-learning platform specializing in technology education. Founded in 2023, our
                mission is to make quality tech education accessible to everyone, regardless of their background or
                prior experience.
              </p>
              <p>
                Our team consists of industry professionals and educators who are passionate about teaching and
                technology. We believe in a hands-on, project-based approach to learning that prepares students for
                real-world challenges.
              </p>
              <p>
                With thousands of students worldwide, PYARENA has helped many individuals transition into tech careers,
                upskill in their current roles, or simply satisfy their curiosity about technology.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span>PYARENA Learning Technologies Inc.</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>123 Tech Avenue, Innovation City, 10001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>info@pyarena.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596552044!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564562986!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="PYARENA Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

