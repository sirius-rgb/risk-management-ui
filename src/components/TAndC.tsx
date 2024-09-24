import React from "react"
import { BellRing, Check } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "./ui/button"

export const TAndC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-pointer font-semibold text-black">
          Terms of Service
        </TooltipTrigger>
        <TooltipContent>
          <Card className={cn("w-[380px]")}>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription>TL DR;</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className=" flex items-center space-x-4 rounded-md border p-4">
                <BellRing />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Please carefully read the terms
                  </p>
                  <p className="text-sm text-muted-foreground">
                    please read, don't skip
                  </p>
                </div>
                {/* <Switch /> */}
              </div>
              <div>
                {[1, 2, 3].map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification}
                      </p>
                      <p className="text-sm text-muted-foreground">{index}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" /> I have read and agree to the
                terms
              </Button>
            </CardFooter>
          </Card>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
