"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern 3BHK Apartment",
    location: "MIDC Area, Jalgaon",
    price: "₹45 Lakhs",
    type: "Apartment",
    beds: 3,
    baths: 2,
    area: "1,200 sq.ft",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Spacious 4BHK Villa",
    location: "Pimprala, Jalgaon",
    price: "₹85 Lakhs",
    type: "Villa",
    beds: 4,
    baths: 3,
    area: "2,500 sq.ft",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Commercial Shop Space",
    location: "Ring Road, Jalgaon",
    price: "₹35 Lakhs",
    type: "Commercial",
    beds: null,
    baths: 1,
    area: "450 sq.ft",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "2BHK Apartment with Garden",
    location: "Mehrun, Jalgaon",
    price: "₹38 Lakhs",
    type: "Apartment",
    beds: 2,
    baths: 2,
    area: "950 sq.ft",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Premium 3BHK Flat",
    location: "Gandhi Nagar, Jalgaon",
    price: "₹52 Lakhs",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: "1,450 sq.ft",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function PropertySlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = properties.length - visibleItems

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={sliderRef}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {properties.map((property) => (
            <div key={property.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-2">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full hover:scale-110 transition-transform"
          aria-label="Previous property"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full hover:scale-110 transition-transform"
          aria-label="Next property"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function PropertyCard({ property }) {
  return (
    <Card className="property-card overflow-hidden h-full transition-all hover:shadow-lg hover:-translate-y-1 duration-300 dark:bg-accent/50 dark:border-accent/70">
      <div className="relative aspect-[4/3]">
        <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        <Badge className="absolute top-2 left-2 bg-primary">{property.type}</Badge>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-bold text-xl">{property.price}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{property.title}</h3>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <p className="text-sm line-clamp-1">{property.location}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {property.beds !== null && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{property.beds} Beds</span>
            </div>
          )}
          {property.baths !== null && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm">{property.baths} Baths</span>
            </div>
          )}
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm">{property.area}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

