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
