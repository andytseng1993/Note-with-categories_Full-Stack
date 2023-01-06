import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
    const Andy = await prisma.user.create({
        data:{
            email:"andy@gmail.com",
            name:"Andy",
            password:"123456789",
            role:"ADMIN",
        }
    }) 
    const post = await prisma.note.create({
        data:{
            title:"test title",
            body:"My first test body",
            authorId: Andy.id,
        }
    })
    console.log(Andy,post);
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