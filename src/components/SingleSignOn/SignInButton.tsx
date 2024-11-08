import React from "react"
import { InseractionStatus } from "@azure/msal-browser"
import { useMsal } from "@azure/msal-react"

import { Button } from "@/components/ui/button"

const getAccessToken = () => {
  return globalThis.msalToken?.accessToken ?? getFromCookies.accessToken()
}

const SignInButton = () => {
  const accessToken = getAccessToken()

  const { instance, inProgress } = useMsal()

  return <div>SignInButton</div>
}

export default SignInButton
