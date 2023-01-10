## Install up Server:

Run `npm i --save-dev express nodemon prisma dotenv typescript ts-node @types/node`  
Then `npx prisma init`

## Model Prisma schema

on `schema.prisma` file build data models.  
In mongodb, ID

- Must be defined by a single field using the `@id`.
- Must include `@map("_id")`.
- ID is represented by the id string field that accepts an auto-generated ObjectId.

[Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

- User to Note -- one-to-many : a user can have zero or more posts, a post must always have an author.
- Category to Note -- many-to-many: zero or more categories can have zero or more notes.
- Tag to Note -- many-to-many: zero or more tags can have zero or more notes.

Run `npx prisma generate`, then create `script.ts` file to bring prisma client.
In`package.json`, add `"scripts":{"dev": "nodemon script.ts"}`
In `script.ts`
Then run `npx prisma db push`
Prisma schema loaded from prisma/schema.prisma

```
    import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()
    async function main() {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const category =await prisma.category.findMany()
    console.log(category);
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
```

Then create a record in main()

## Create routes/api

- categories

  - api/categories -- GET, POST
  - api/categories/:id -- PUT, DELETE

- notes

  - api/notes -- GET
  - api/notes/:categoryId -- GET, POST
  - api/notes/:categoryId/:noteId -- PUT, DELETE

- tags

  - api/tags -- GET,POST
  - api/tags/:id -- PUT, DELET

- register user
  - api/users -- POST
    - Use password to create salt & hash from bcryptjs, and save to database, then use user.id to create token from jsonwebtoken, and return to client.

## Tips

`dotenv` doesn't tell typescript anything. So, provide a default:

```
  const secret: string = process.env.WHATEVER ?? 'whatever default'
```

It can fix undifined problem!
