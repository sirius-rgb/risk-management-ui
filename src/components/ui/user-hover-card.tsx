import { Briefcase, Building2, Mail, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface UserProfile {
  name: string
  jobTitle: string
  department: string
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
  const { name, jobTitle, mail, avatarUrl, department } = props

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
        <HoverCardInfo icon={User} text={name} />
        <HoverCardInfo icon={Briefcase} text={jobTitle} />
        <HoverCardInfo icon={Mail} text={mail} />
        <HoverCardInfo icon={Building2} text={department} />
      </HoverCardContent>
    </HoverCard>
  )
}
