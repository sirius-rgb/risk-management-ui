"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  const handleAccountSelection = (email: string) => {
    setShowLoginModal(false)
    setIsLoggedIn(true)
    // Simulate redirect to current page
    router.push("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter dark:border-none dark:bg-transparent">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="logo"
              className="mr-2 h-6 w-auto sm:h-7 md:h-8"
            />
            <a
              href="/"
              className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-white sm:text-xl md:ml-2 md:text-2xl"
            >
              Co-pilot
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              {/* 这里放置大屏幕下的导航项目 */}
              {isLoggedIn ? (
                <div className="flex items-center justify-center gap-4">
                  <a href="/create-issue">Issue</a>
                  {/* <a href="/review-issue">Review</a> */}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage className="max-w-8" src={"/avatar.png"} />
                        <AvatarFallback>"U"</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Keyboard className="mr-2 h-4 w-4" />
                          <span>Keyboard shortcuts</span>
                          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          <span>Team</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Email</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Message</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>More...</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          <span>New Team</span>
                          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Github className="mr-2 h-4 w-4" />
                        <span>GitHub</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>API</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button onClick={handleLogin}>Login</Button>
              )}
            </div>
            <ModeToggle />
            <div className="sm:hidden">
              <Button onClick={toggleMobileMenu}>☰</Button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && <MobileMenu />}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onAccountSelect={handleAccountSelection}
        />
      </div>
    </nav>
  )
}

const MobileMenu = () => {
  return (
    <div className="mt-2 space-y-2 text-center text-gray-900 md:hidden">
      <a
        href="#"
        className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      >
        Login
      </a>
      <a
        href="#"
        className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      >
        About
      </a>
      <a
        href="#"
        className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      >
        Review
      </a>
    </div>
  )
}

function LoginModal({ isOpen, onClose, onAccountSelect }) {
  const fakeEmails = ["tom.jerry@test.example.com"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Sign in to your account
          </DialogTitle>
          <DialogDescription className="text-lg">
            Pick an account
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          {fakeEmails.map((email) => (
            <div
              key={email}
              className="cursor-pointer rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => onAccountSelect(email)}
            >
              <p className="text-sm font-medium">{email}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
