"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Star } from "lucide-react"
import { useRef, useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PropertySlider from "@/components/property-slider"
import ContactForm from "@/components/contact-form"
import { ThemeToggle } from "@/components/theme-toggle"
import CallNowModal from "@/components/call-now-modal"
import { useTheme } from "next-themes"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Rajesh Patil",
    location: "Jalgaon, Maharashtra",
    text: "Pramod helped us find our dream home in Jalgaon. His knowledge of the local market and dedication to understanding our needs made the process smooth and enjoyable.",
    rating: 5,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sneha Sharma",
    location: "MIDC Area, Jalgaon",
    text: "After struggling to sell our property for months, we approached Shree Ganesh Real Estate. Within 3 weeks, they found us a buyer at a great price. Their marketing strategy and network is impressive!",
    rating: 5,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Amit Deshmukh",
    location: "Pimprala, Jalgaon",
    text: "As first-time homebuyers, we were nervous about the process. Pramod guided us through every step with patience and expertise. He found us a property that matched all our requirements within our budget.",
    rating: 5,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Priya Joshi",
    location: "Gandhi Nagar, Jalgaon",
    text: "I was looking for a commercial property for my business. The team at Shree Ganesh Real Estate understood my requirements perfectly and showed me options that I hadn't even considered. Very professional service!",
    rating: 4,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Ring Road, Jalgaon",
    text: "We were relocating to Jalgaon and needed to find a home quickly. Pramod arranged virtual tours of multiple properties and helped us finalize one before we even arrived in the city. Exceptional service!",
    rating: 5,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function HomePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [displayedTestimonials, setDisplayedTestimonials] = useState(testimonials.slice(0, 3))

  const propertiesRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openCallModal = () => {
    setIsCallModalOpen(true)
  }

  const closeCallModal = () => {
    setIsCallModalOpen(false)
  }

  const shuffleTestimonials = () => {
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
    setDisplayedTestimonials(shuffled.slice(0, 3))
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GaneshaIcon className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold">Shree Ganesh Real Estate</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#home" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link
              href="#properties"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(propertiesRef)
              }}
            >
              Properties
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(contactRef)
              }}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button size="sm" onClick={openCallModal}>
              <Phone className="mr-2 h-4 w-4" /> Call Now
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/jalgaon.jpg"
              alt="Jalgaon Real Estate"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
            <div className="absolute inset-0 hero-overlay bg-black/50 dark:bg-black/70"></div>
          </div>
          <div className="container relative z-10 flex flex-col items-start justify-center min-h-[80vh] py-12 text-white">
            <div className="max-w-md space-y-4 animate-fadeIn">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm">Premier Properties in Jalgaon</div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Find Your Dream Home in Maharashtra
              </h1>
              <p className="text-lg text-white/90">
                Pramod Sonawane, your trusted real estate partner in Jalgaon, helping families find their perfect homes
                since 2010.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 animate-pulse"
                  onClick={() => scrollToSection(propertiesRef)}
                >
                  Browse Properties
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={() => scrollToSection(contactRef)}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/50">
          <div className="container py-6 md:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2 animate-fadeIn" style={{ animationDelay: "100ms" }}>
                <h3 className="text-3xl font-bold">200+</h3>
                <p className="text-sm text-muted-foreground">Properties Sold</p>
              </div>
              <div className="space-y-2 animate-fadeIn" style={{ animationDelay: "200ms" }}>
                <h3 className="text-3xl font-bold">10+</h3>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-2 animate-fadeIn" style={{ animationDelay: "300ms" }}>
                <h3 className="text-3xl font-bold">150+</h3>
                <p className="text-sm text-muted-foreground">Happy Families</p>
              </div>
              <div className="space-y-2 animate-fadeIn" style={{ animationDelay: "400ms" }}>
                <h3 className="text-3xl font-bold">4.9</h3>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-lg overflow-hidden animate-slideInLeft">
                <Image
                  src="/about.jpeg"
                  alt="Pramod Sonawane"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 animate-slideInRight">
                <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm">
                  About Pramod Sonawane
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Your Trusted Real Estate Partner in Jalgaon</h2>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <Star className="fill-yellow-500 h-5 w-5" />
                  <span className="ml-2 text-sm text-muted-foreground">(120+ Reviews)</span>
                </div>
                <p className="text-muted-foreground">
                  With over a decade of experience in the Jalgaon real estate market, I understand the local dynamics
                  and can help you find the perfect property that meets your needs and budget.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Expert in residential and commercial properties</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Personalized property search assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>Transparent and hassle-free transactions</span>
                  </li>
                </ul>
                <Button className="mt-2">Learn More About Us</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section id="properties" ref={propertiesRef} className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
                <p className="text-muted-foreground mt-1">Discover our handpicked properties in Jalgaon</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View All Properties
                </Button>
              </div>
            </div>

            <PropertySlider />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">What Our Clients Say</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Don't just take our word for it. Here's what our happy clients have to say.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {displayedTestimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="testimonial-card border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-accent/50 dark:border-accent/70"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 text-yellow-500 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="fill-yellow-500 h-4 w-4" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-muted-foreground" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline" onClick={shuffleTestimonials}>
                See More Reviews
              </Button>
            </div>
          </div>
        </section>

        {/* Areas We Serve */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Areas We Serve in Jalgaon</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                We cover all major localities in and around Jalgaon, Maharashtra.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "MIDC Area",
                "Pimprala",
                "Mehrun",
                "Shivaji Nagar",
                "Gandhi Nagar",
                "Ring Road",
                "Akashwani",
                "Navi Peth",
              ].map((area, index) => (
                <div
                  key={area}
                  className="bg-background rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 dark:bg-accent/50 dark:border-accent/70"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MapPin className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 animate-slideInLeft">
                <div className="inline-block rounded-lg bg-primary/10 text-primary px-3 py-1 text-sm">Get In Touch</div>
                <h2 className="text-3xl font-bold tracking-tight">Contact Pramod Sonawane</h2>
                <p className="text-muted-foreground">
                  Have questions about a property or need assistance? Reach out to us and we'll get back to you as soon
                  as possible.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+91 9225124961</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">sgit.jal@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="text-muted-foreground">
                        123 Ring Road, Near City Center Mall, Jalgaon, Maharashtra 425001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form bg-muted/30 rounded-lg p-6 animate-slideInRight dark:bg-accent/50 dark:border-accent/70">
                <h3 className="text-xl font-bold mb-4">Send us a message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GaneshaIcon className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Shree Ganesh Real Estate</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted real estate partner in Jalgaon, Maharashtra. Finding your dream home since 2010.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Property Types</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Residential
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Commercial
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Plots & Land
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    New Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Working Hours</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday:</span>
                  <span>9:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Saturday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Sunday:</span>
                  <span>By Appointment</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Shree Ganesh Real Estate. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">WhatsApp</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.301-.767.966-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.269-.467-2.416-1.483-.893-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.462.13-.61.136-.137.301-.354.451-.531.151-.177.2-.301.3-.502.099-.2.05-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.007-.371-.01-.571-.01-.2 0-.523.074-.797.375-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.209 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.571-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Call Now Modal */}
      <CallNowModal isOpen={isCallModalOpen} onClose={closeCallModal} />
    </div>
  )
}

function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function GaneshaIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z"
        fill="currentColor"
      />
      <path
        d="M16 10C15.5 10 15 10.2 14.6 10.6C14.2 11 14 11.5 14 12V14C14 14.5 13.8 15 13.4 15.4C13 15.8 12.5 16 12 16C11.5 16 11 15.8 10.6 15.4C10.2 15 10 14.5 10 14V12C10 11.5 9.8 11 9.4 10.6C9 10.2 8.5 10 8 10C7.5 10 7 10.2 6.6 10.6C6.2 11 6 11.5 6 12V14C6 15.1 6.4 16.1 7.1 16.9C7.9 17.6 8.9 18 10 18H14C15.1 18 16.1 17.6 16.9 16.9C17.6 16.1 18 15.1 18 14V12C18 11.5 17.8 11 17.4 10.6C17 10.2 16.5 10 16 10Z"
        fill="currentColor"
      />
      <path
        d="M15 8C15 7.4 14.8 6.9 14.5 6.4C14.2 5.9 13.7 5.6 13.2 5.3C12.8 5.1 12.4 5 12 5C11.6 5 11.2 5.1 10.8 5.3C10.3 5.6 9.8 5.9 9.5 6.4C9.2 6.9 9 7.4 9 8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

