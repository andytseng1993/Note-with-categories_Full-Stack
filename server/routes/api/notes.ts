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

//@route GET api/notes/:categoryId
//@desc return All notes in category and author name
//@access Public
router.get('/:categoryId', async(req,res)=>{
    const {categoryId} = req.params
    const notes = await prisma.note.findMany({
        where:{
            categoryId
        },
        select:{
            title:true,
            body: true,
            updateAt:true,
            createdAt:true,
            author:{
                select:{
                    name: true
                }
            }
        }
    })
    return res.json(notes)
})

//@route GET api/notes/:categoryId
//@desc return All notes in category and author name
//@access Public
router.post('/:categoryId', async(req,res)=>{
    const { categoryId } = req.params
    const {title,body,authorId,tagId} = req.body
    const notes = await prisma.note.findMany({
        where:{
            categoryId
        },
        select:{
            title:true,
            body: true,
            updateAt:true,
            createdAt:true,
            author:{
                select:{
                    name: true
                }
            }
        }
    })
    return res.json(notes)
})

//@route POST api/notes/:categoryId
//@desc return a note in category
//@access Public
router.post('/:categoryId', async(req,res)=>{
    const {categoryId} = req.params
    const {title,body,authorId,tagId} = req.body
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