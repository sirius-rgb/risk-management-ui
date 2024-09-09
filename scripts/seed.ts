import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("keqing", 10)

  await prisma.user.upsert({
    where: { username: "keqing" },
    update: {},
    create: {
      username: "keqing",
      password: hashedPassword,
    },
  })

  console.log("Seed data created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
