## Install up Server:

Run `npm i --save-dev express nodemon prisma dotenv typescript ts-node @types/node`  
Then `npx prisma init`

## Model Prisma schema

on `schema.prisma` file build data models.  
In mongodb, ID

- Must be defined by a single field using the `@id`
- Must include `@map("_id")`
- ID is represented by the id string field that accepts an auto-generated ObjectId
  [Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

Run `npx prisma generate`, then create `script.ts` file to bring prisma client.

```
    import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()
```

Then create a record in main()
