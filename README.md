<h1 align="center">copilot-ui</h1>

<p align="center"><b>An useful AI Assistant</b></p>
<p align="center">
  <img height="20" src="https://img.shields.io/badge/react-%2335495e.svg?style=for-the-badge&logo=react&logoColor=%234FC08D" alt="VueJs" />
  <img height="20" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img height="20" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img height="20" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  <br/>

</p>

## QuickStart

```shell
# copy env file from template
cp .env.example .env.local

# create .npmrc file and add nexus registry
echo "registry=<URL>" > .npmrc

# install dependencies
pnpm i

# start the local server
pnpm run dev
```

## Using Docker

1. Install Docker on your machine.
1. Build your container: `docker build -t rm-management-ui-docker .`
1. Run your container: `docker run -p 3000:3000 rm-management-ui-docker`

## temp code

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { authenticate } from "auth-provider"

export function middleware(request: NextRequest) {
  const isAuthenticated = authenticate(request)

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next()
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url))
}

export const config = {
  matcher: "/dashboard/:path*",
}

//next.config.js
module.exports = {
  async redirects() {
    return [
      // if the header `x-redirect-me` is present,
      // this redirect will be applied
      {
        source: "/:path((?!another-page$).*)",
        has: [
          {
            type: "header",
            key: "x-redirect-me",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
      // if the header `x-dont-redirect` is present,
      // this redirect will NOT be applied
      {
        source: "/:path((?!another-page$).*)",
        missing: [
          {
            type: "header",
            key: "x-do-not-redirect",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
      // if the source, query, and cookie are matched,
      // this redirect will be applied
      {
        source: "/specific/:path*",
        has: [
          {
            type: "query",
            key: "page",
            // the page value will not be available in the
            // destination since value is provided and doesn't
            // use a named capture group e.g. (?<page>home)
            value: "home",
          },
          {
            type: "cookie",
            key: "authorized",
            value: "true",
          },
        ],
        permanent: false,
        destination: "/another/:path*",
      },
      // if the header `x-authorized` is present and
      // contains a matching value, this redirect will be applied
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "x-authorized",
            value: "(?<authorized>yes|true)",
          },
        ],
        permanent: false,
        destination: "/home?authorized=:authorized",
      },
      // if the host is `example.com`,
      // this redirect will be applied
      {
        source: "/:path((?!another-page$).*)",
        has: [
          {
            type: "host",
            value: "example.com",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
    ]
  },
}
```
