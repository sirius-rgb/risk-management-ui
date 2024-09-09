"use client"

import { KeyboardEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip"
import { BellRing, Check } from "lucide-react"
import { toast } from "sonner"

import { useAuthStore } from "@/lib/store/authStore"
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
import { Icons } from "@/components/icons"

export default function Home() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()
  const { isLoggedIn, setLoggedIn } = useAuthStore()

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home")
    }
  }, [isLoggedIn, router])

  const handleLogin = async () => {
    if (username && password && agreeTerms) {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })

        const data = await response.json()
        console.log(data)

        if (data.success) {
          setLoggedIn(true, { username, avatar: "/avatar.png" })
          router.push("/home")
        } else {
          toast(data.message || "登录失败")
        }
      } catch (error) {
        toast("服务器错误！")
      }
    } else if (!agreeTerms) {
      toast("请同意服务条款和隐私政策")
    } else {
      toast("请输入用户名和密码")
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
        <a className="cursor-pointer" href="/home">
          Co-pilot
        </a>
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
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="w-96"
          type="password"
          placeholder="password"
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
            <Input
              id="link-checkbox"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mr-2 inline h-3 w-3 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            By clicking continue, you agree to our
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-pointer font-semibold text-black dark:text-white">
                  Terms of Service
                </TooltipTrigger>
                <TooltipContent>
                  <Card className={cn("w-[380px]")}>
                    <CardHeader>
                      <CardTitle>Terms of Service</CardTitle>
                      <CardDescription>RM Copilot</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <BellRing />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            RM Copilot is a AI assistant
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Please have a look at our terms of service
                          </p>
                        </div>
                        {/* <Switch /> */}
                      </div>
                      <div>
                        <p>
                          Welcome to Copilot. By accessing or using our
                          application, you agree to comply with and be bound by
                          the following terms and conditions. These terms apply
                          to all users of the application, including but not
                          limited to risk managers, analysts, and other
                          stakeholders.
                        </p>
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
            <span className="cursor-pointer font-semibold text-black dark:text-white">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}
