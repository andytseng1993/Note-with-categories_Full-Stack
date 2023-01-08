import { PrismaClient } from "@prisma/client";
import express from 'express'

const prisma = new PrismaClient()
const router = express.Router()

//@route GET api/notes
//@desc return All notes
//@access Public

router.get('/', async(req,res)=>{
    const notes = await prisma.note.findMany()
    return res.json(notes)
})

//@route POST api/notes
//desc return A new note
//@access Public
router.post('/',async(req,res)=>{
    const {title,body,authorId,tagId,categoryId} = req.body
    const note = await prisma.note.create({
        data:{
            title,
            body,
            authorId,
            tagId,
            categoryId
        }
    })
    return res.json(note)
})


export default router;