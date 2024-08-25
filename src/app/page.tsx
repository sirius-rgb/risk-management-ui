"use client"

import { KeyboardEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { BellRing, Check } from "lucide-react"
import { toast } from "sonner"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { Icons } from "@/components/icons"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const notifications = [
    {
      title: "Top secret!!!",
      description: "1 hour ago",
    },
    {
      title: "Top secret!!!",
      description: "1 hour ago",
    },
    {
      title: "Top secret!!!",
      description: "2 hours ago",
    },
  ]

  const handleLogin = () => {
    if (email && password) {
      router.push("/home")
    } else {
      toast("Please fill in username and password first.")
      return
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }
  return (
    <main className="relative flex h-screen items-center justify-center">
      <h1 className="absolute left-8 top-8 font-semibold sm:text-lg md:text-xl lg:text-2xl">
        SECRET AI Assistant
      </h1>
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <Icons.logo className="h-16 w-16" />
        <h1 className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
          Login
        </h1>
        <p className="sm:text-md max-w-[32rem] leading-normal text-muted-foreground sm:leading-6">
          Enter your email and password to enter
        </p>
        <Input
          className="w-96"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="w-96"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="flex flex-col gap-6">
          <Button
            onClick={handleLogin}
            className={cn(buttonVariants({ size: "default" }), "h-10 w-96")}
          >
            Login
          </Button>
          <p className="sm:text-md max-w-[24rem] leading-normal text-muted-foreground sm:leading-6">
            By clicking continue, you agree to our
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
                        {notifications.map((notification, index) => (
                          <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                          >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notification.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Check className="mr-2 h-4 w-4" /> I have read and agree
                        to the terms
                      </Button>
                    </CardFooter>
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            and{" "}
            <span className="cursor-pointer font-semibold text-black">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}
