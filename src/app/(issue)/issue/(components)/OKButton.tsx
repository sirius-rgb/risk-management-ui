import React from "react"

import { Button } from "@/components/ui/button"

interface OKButtonProps {
  children?: React.ReactNode
  handleClick?: () => void
}

const OKButton = (props: OKButtonProps) => {
  const { children: child, handleClick } = props
  return (
    <Button onClick={handleClick} className="my-2 block text-center">
      {child}
    </Button>
  )
}

export default OKButton
