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

import { Container } from "../container"
import LoginModal from "./login-modal"
import MobileMenu from "./mobile-menu"

export default function Header() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const showLoginModal = useStore((state) => state.showLoginModal)
  const setShowLoginModal = useStore((state) => state.setShowLoginModal)

  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const setIsLoggedIn = useStore((state) => state.setLoggedIn)

  const isAcceptTAndC = useStore((state) => state.isAcceptTAndC)
  const initializeAuth = useStore((state) => state.initializeAuth)

  const sendFeedback = debounce(() => {
    console.log("Sending feedback")
  }, 500)

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
    setIsLoggedIn(false)
    localStorage.setItem("isLoggedIn", "false")
    localStorage.removeItem("hasAcceptedTandC")
    router.push("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <header>
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter dark:border-none dark:bg-transparent">
        <Container className="relative z-50 flex justify-between ">
          <div className="max-w-8xl container mx-auto">
            {/* max-w-[1920px] */}
            <div className="flex h-16 items-center justify-between">
              <div
                className="flex cursor-pointer items-center "
                onClick={() => router.push("/")}
              >
                <img
                  src="/logo.png"
                  alt="logo"
                  className="mr-2 h-12 w-auto sm:h-6 md:h-8"
                />
                <a className="hidden text-xl font-semibold text-gray-900 dark:text-white sm:text-xl md:ml-2 md:block md:text-xl">
                  Risk Management Co-pilot
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
              onClose={() => setShowLoginModal(false, false)}
            />
          </div>
        </Container>
      </nav>
    </header>
  )
}

interface NavBarItemsProps {
  handleLogout: () => void
}

const NavBarItems: React.FC<NavBarItemsProps> = ({ handleLogout }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Icons.logo className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Risk Management Co-pilot
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        A generative AI assistant that helps you draft risk and
                        control narratives. Select the task that you need help.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/" title="Introduction">
                  Introduction to the Co-pilot
                </ListItem>
                <ListItem href="/terms-and-conditions" title="Usage">
                  Guide to use the Co-pilot
                </ListItem>
                <ListItem href="/terms-and-conditions" title="User Conditions">
                  User conditions and terms
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Issues</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={() => router.push("/issue")}
              >
                Create Issue
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage className="select-none" src={"/avatar.png"} />
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
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
