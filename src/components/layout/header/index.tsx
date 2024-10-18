"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/store"
import { debounce } from "lodash"
import {
  Cloud,
  CreditCard,
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

import { components } from "@/lib/conts"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

import LoginModal from "./login-modal"
import MobileMenu from "./mobile-menu"
import NavBarItems from "./navbar-items"

export default function Header() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const showLoginModal = useStore((state) => state.showLoginModal)
  const setShowLoginModal = useStore((state) => state.setShowLoginModal)

  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const setIsLoggedIn = useStore((state) => state.setLoggedIn)

  const isAcceptTAndC = useStore((state) => state.isAcceptTAndC)
  const initializeAuth = useStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    const hasAcceptedTandC = localStorage.getItem("hasAcceptedTandC")
    if (hasAcceptedTandC) {
      setShowLoginModal(false, true)
      return
    }

    if (isLoggedIn) {
      setTimeout(() => {
        setShowLoginModal(true, false)
        localStorage.setItem("hasAcceptedTandC", "true")
      }, 500)
    }
  }, [isLoggedIn, setShowLoginModal])

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
  }

  const handleLogout = () => {
    console.log("logout")
    setIsLoggedIn(false)
    localStorage.setItem("isLoggedIn", "false")
    localStorage.removeItem("hasAcceptedTandC")
    router.push("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter dark:border-none dark:bg-transparent">
      <div className="max-w-8xl container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div
            className="flex cursor-pointer items-center "
            onClick={() => router.push("/")}
          >
            <img
              // src="/logo.svg"
              src="/logo.png"
              alt="logo"
              className="mr-2 h-6 w-auto sm:h-7 md:h-8"
            />
            <a className="text-lg font-semibold text-gray-900 dark:text-white sm:text-xl md:ml-2 md:text-2xl">
              RM Co-pilot
            </a>
          </div>
          <div className="flex items-center space-x-4 ">
            <div className="hidden sm:block">
              {/* 放置大屏幕下的导航项目 */}
              {isLoggedIn ? (
                <NavBarItems handleLogout={handleLogout} />
              ) : (
                <Button
                  variant="outline"
                  className="bg-background hover:bg-accent"
                  onClick={handleLogin}
                >
                  Login
                </Button>
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
          handleAccept={() => setShowLoginModal(false, true)}
          onClose={handleLogout}
        />
      </div>
    </nav>
  )
}
