# Setup Server

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

## Prisma handle errors

```
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (e.code === 'P2002') {
      console.log(
        'There is a unique constraint violation, a new user cannot be created with this email'
      )
    }
  }
```

To get differrent Prisma-specific error code.

## Create routes/api

`npm i --save-dev bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken`

- categories

  - api/categories -- GET, POST
  - api/categories/:id -- GET, PUT, DELETE

- notes

  - api/notes -- GET,
    - POST -- title, body, authorId, tagIdArray? ,categoryId?
  - api/notes/:noteId -- PUT --title, body, editAuthor, tagIdArray, categoryId
  - api/notes/:noteId -- GET,DELETE

- tags

  - api/tags -- GET,POST
  - api/tags/:id -- PUT, DELET

- register user

  - api/users -- POST
    - Use password to create salt & hash from [bcryptjs](https://www.npmjs.com/package/bcryptjs), and save to database, then use user.id to create token from [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), and return to client by cookie.
  - api/users/login -- POST
  - api/auth/user -- GET
    - Use jsonwebtoken to verify cookie's sessionId, then use prisma to findUnique by id to get user info.

- user
  - api/users/login -- POST --> Login
  - api/users --POST --> Register

## [Modeling and querying many-to-many relations](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/working-with-many-to-many-relations)

1. To create a post and its tags, use `tags: { create: [{ name: 'dev' }, { name: 'prisma' }] }`
2. To select existing tags to post, use `tags: { set: [{ id: 1 }, { id: 2 }] },`

- To create and select tags, combine 1. and 2. `tags: { set: [{ id: 1 }, { id: 2 }], create: { name: 'new' } }`

## Tips

1. `dotenv` doesn't tell typescript anything. So, provide a default:

```
  const secret: string = process.env.WHATEVER ?? 'whatever default'
```

It can fix undifined problem! 2. Typescript don't know about JwtPayload. Data declaration should help.

```
  interface JwtPayload {
    id: string
}
  const { id } = jwt.verify(token, 'thisisfromabhishek') as JwtPayload
```

## Express middleware

```
  import { NextFunction, Request, Response } from 'express'
  const auth = (req: Request,res: Response,next: NextFunction) =>{
    ...
  }
```

If use unique req, we can use extends in interface.

```
  interface RequestWithId extends Request {
    user?: UserId
  }
  interface UserId {
    id: string
  }

```

# Setup Client

Run `npm create vite`, then select react and typescript.
Install `npm i react-bootstrap bootstrap react-router-dom`, and setup concurrently in server package, then run both server.

Type:
`children: PropsWithChildren`

## [React-select-creatable](https://react-select.com/creatable)

```
  mutationFn: (newTag: object): Promise<AxiosResponse> => {
			return axios.post('/api/tags', newTag)
  },
  onSuccess: ({ data }) => {
    queryClient.invalidateQueries({ queryKey: ['tags'] })
    setSelectTags((prev) => [...prev, ...[data]])
    console.log(data)
  }
```

1. onSuccess: (data: TData) , data is return from axios, so data is contain status, data, config, etc..., we use destructure`{data}` to get data.
2. If without **Promise<AxiosResponse>**,{data} in onSuccess fn will get warning.
3. In `[...prev, ...[data]]`:

## Spread syntax in TypeScript

- Try to use the spread syntax (...) to unpack an object in an array,
  **wrap it in an array** before using the spread syntax (...) in TypeScript.
- [Symbol.iterator method](https://bobbyhadz.com/blog/typescript-type-object-must-have-symbol-iterator-method)

* useRef<HTMLInputElement>(null) -- Input ref
* useRef<HTMLTextAreaElement>(null) -- TextArea input
* setSelectTags: Dispatch<SetStateAction<Type>>

## Time

`const dateFormatter = new Intl.DateTimeFormat(undefined,{dateStyle:'medium'}) `
` dateFormatter.format(Date.parse(data.updateAt))`
