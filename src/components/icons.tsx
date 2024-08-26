import {
  Bot,
  CalendarDays,
  CircleUserRound,
  FileUp,
  Globe,
  Lock,
  Moon,
  SunMedium,
} from "lucide-react"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Bot,
  sun: SunMedium,
  moon: Moon,
  fileup: FileUp,
  globe: Globe,
  user: CircleUserRound,
  lock: Lock,
  calendar: CalendarDays,
}

export const Icons: IconsType = icons
