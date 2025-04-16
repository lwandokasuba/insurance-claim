import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Lwando Kasuba',
    email: 'lwandojapkas@gmail.com',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: 'password',
  },
  {
    name: 'Admin Kasuba',
    email: 'lwando.developer@gmail.com',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: 'password',
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
