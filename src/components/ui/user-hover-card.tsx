import { Briefcase, Building2, LogOut, Mail, User } from "lucide-react"
import { signOut } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface UserProfile {
  name: string
  // jobTitle: string
  // department: string
  mail: string
  avatarUrl: string
  // staffID: string,
}

interface CardInfo {
  icon: any
  text: string
  isMuted?: boolean
}

export default function UserHoverCard(props: UserProfile) {
  const { name, mail, avatarUrl } = props

  const HoverCardInfo = ({ icon: Icon, text, isMuted = false }: CardInfo) => (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4 opacity-70" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  )

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage src={avatarUrl} alt="User avatar" />
          <AvatarFallback>
            <AvatarImage src="/logo.svg" alt="User avatar" />
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 overflow-ellipsis">
        <div className="space-y-3">
          <HoverCardInfo icon={User} text={name} />
          <div className="pt-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
