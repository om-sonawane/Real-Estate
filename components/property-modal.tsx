"use client"
import Image from "next/image"
import { MapPin, Bed, Bath, Square, Calendar, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type PropertyType = {
  id: number
  title: string
  location: string
  price: string
  type: string
  beds: number | null
  baths: number | null
  area: string
  image: string
  description?: string
  features?: string[]
  yearBuilt?: string
  amenities?: string[]
}

interface PropertyModalProps {
  property: PropertyType | null
  isOpen: boolean
  onClose: () => void
}

export default function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
  if (!property) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{property.title}</DialogTitle>
            <Badge className="bg-primary">{property.type}</Badge>
          </div>
          <DialogDescription className="flex items-center text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            {property.location}
          </DialogDescription>
        </DialogHeader>

        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          <div className="absolute bottom-3 left-3 bg-black/70 text-white font-bold text-lg px-3 py-1 rounded-md">
            {property.price}
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 py-2">
              {property.beds !== null && (
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <Bed className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-sm font-medium">{property.beds} Bedrooms</span>
                </div>
              )}
              {property.baths !== null && (
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <Bath className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-sm font-medium">{property.baths} Bathrooms</span>
                </div>
              )}
              <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                <Square className="h-5 w-5 mb-1 text-primary" />
                <span className="text-sm font-medium">{property.area}</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground text-sm">
                {property.description ||
                  `This beautiful ${property.type.toLowerCase()} is located in the heart of ${property.location}. It offers spacious rooms with modern amenities and is perfect for families looking for comfort and convenience. The property is well-maintained and ready to move in.`}
              </p>
            </div>

            {property.yearBuilt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Year Built: {property.yearBuilt}</span>
              </div>
            )}
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Property Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {(
                  property.features || [
                    "24/7 Security",
                    "Power Backup",
                    "Parking Space",
                    "Garden Area",
                    "Water Supply",
                    "Close to Market",
                    "Near Schools",
                    "Public Transport",
                  ]
                ).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {(property.amenities || ["Swimming Pool", "Gym", "Children's Play Area", "Community Hall"]).length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(property.amenities || ["Swimming Pool", "Gym", "Children's Play Area", "Community Hall"]).map(
                    (amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        {amenity}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Contact Agent</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Agent" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">Pramod Sonawane</p>
                  <p className="text-sm text-muted-foreground">Real Estate Consultant</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={() => (window.location.href = "tel:+919876543210")}>
                  Call Agent
                </Button>
                <Button variant="outline" className="w-full" onClick={() => (window.location.href = "#contact")}>
                  Send Message
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                Property ID: SGR-{property.id}00{property.id}
              </p>
              <p>Listed on: {new Date().toLocaleDateString()}</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

