import { Bot, FileUp, Moon, SunMedium } from "lucide-react"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Bot,
  sun: SunMedium,
  moon: Moon,
  fileup: FileUp,
}

export const Icons: IconsType = icons
