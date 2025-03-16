"use client"

import { useState } from "react"
import { Phone, Copy, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CallNowModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CallNowModal({ isOpen, onClose }: CallNowModalProps) {
  const [copied, setCopied] = useState(false)
  const phoneNumber = "+91 9225124961"

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Contact Us
          </DialogTitle>
          <DialogDescription>Call us now to speak with our real estate experts.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <span className="font-medium text-lg">{phoneNumber}</span>
            <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy number</span>
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Available Monday to Saturday</p>
            <p>9:00 AM - 7:00 PM</p>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={handleCall}>
            Call Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

