"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface TermsAndConditionsProps {
  isAcceptTAndC: boolean
  setAcceptTAndC: (accepted: boolean) => void
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  isAcceptTAndC,
  setAcceptTAndC,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAccept = () => {
    setAcceptTAndC(true)
    setDialogOpen(false)
  }

  const handleCancel = () => {
    setDialogOpen(false)
  }

  // Handle direct checkbox click - open dialog only if unchecking
  // Or always open dialog on click? Let's make the label the trigger.
  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      // If user tries to check it directly, show dialog first
      setDialogOpen(true)
    } else {
      // Allow unchecking directly
      setAcceptTAndC(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="items-top flex space-x-2 p-4">
        <Checkbox
          id="terms1"
          checked={isAcceptTAndC}
          onCheckedChange={handleCheckboxChange}
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="terms1" className="font-medium">
            Accept terms and conditions
          </Label>
        </div>
      </div>

      <DialogContent className="sm:min-w-[540px] xl:min-w-[640px]">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read and accept the terms and conditions before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto p-4 text-sm">
          {/* Replace with your actual terms */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada. Nullam ac erat ante.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada. Nullam ac erat ante.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada. Nullam ac erat ante.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
            malesuada. Nullam ac erat ante.
          </p>
        </div>
        <DialogFooter>
          {/* DialogClose automatically closes the dialog */}
          <Button type="button" onClick={handleAccept}>
            I Accept
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TermsAndConditions
