"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useStore } from "@/store"
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
import { signIn, signOut, useSession } from "next-auth/react"

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
import UserHoverCard from "@/components/ui/user-hover-card"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/shared/mode-toggle"

import { LoginButton } from "../shared/login-button"
import LoginModal from "./login-modal"
import MobileMenu from "./mobile-menu"

export default function Header() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const showLoginModal = useStore((state) => state.showLoginModal)
  const setShowLoginModal = useStore((state) => state.setShowLoginModal)

  useEffect(() => {
    if (status === "unauthenticated") {
      sessionStorage.removeItem("hasAcceptedTandC")
    }
  }, [status])

  useEffect(() => {
    const hasAcceptedTandC = sessionStorage.getItem("hasAcceptedTandC")
    if (hasAcceptedTandC) {
      setShowLoginModal(false)
      return
    }

    if (session) {
      setTimeout(() => {
        setShowLoginModal(true)
        sessionStorage.setItem("hasAcceptedTandC", "true")
      }, 500)
    }
  }, [session, setShowLoginModal])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <header>
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter dark:border-none dark:bg-transparent">
        <div className="relative z-50 flex justify-between ">
          <div className="max-w-8xl container mx-auto">
            {/* max-w-[1920px] */}
            <div className="flex h-16 items-center justify-between">
              <div
                className="flex cursor-pointer items-center "
                onClick={() => router.push("/")}
              >
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="mr-2 h-12 w-auto sm:h-6 md:h-8"
                />
                <a className="hidden text-xl font-semibold text-gray-900 dark:text-white sm:text-xl md:ml-2 md:block md:text-xl">
                  Fun Management CoPilot
                </a>
              </div>
              <div className="flex items-center space-x-4 ">
                <div className="hidden sm:block">
                  {session ? <NavBarItems /> : <LoginButton />}
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
              handleAccept={() => setShowLoginModal(false)}
              onClose={() => {
                setShowLoginModal(false)
                signOut()
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  )
}

const NavBarItems: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const setResponseData = useStore((state) => state.setResponseData)

  return (
    <div className="flex items-center justify-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/issue" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => {
                  setResponseData(null)
                  router.push("/issue")
                }}
              >
                Create Issue
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <UserHoverCard
        name={session?.user?.name || ""}
        mail={session?.user?.email || ""}
        avatarUrl={session?.user?.image || ""}
      />
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
