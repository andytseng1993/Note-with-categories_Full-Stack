import { PrismaClient } from "@prisma/client";
import express from 'express'

const prisma = new PrismaClient()
const router = express.Router()

//@route GET api/notes
//@desc return All notes
//@access Public
router.get('/', async (req, res) => {
    const notes = await prisma.note.findMany()
    return res.json(notes)
})

//@route GET api/notes/:categoryId
//@desc return All notes in category and author name
//@access Public
router.get('/:categoryId', async (req, res) => {
    const { categoryId } = req.params
    const notes = await prisma.note.findMany({
        where: {
            id: categoryId
        },
        select: {
            title: true,
            body: true,
            updateAt: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return res.json(notes)
})

//@route POST api/notes:categoryId
//desc return A new note
//@access Public
router.post('/:categoryId', async (req, res) => {
    const { categoryId } = req.params
    const { title, body, authorId, tagId } = req.body
    const note = await prisma.note.create({
        data: {
            title,
            body,
            authorId,
            tagId,
            categoryId
        }
    })
    return res.status(201).json(note)
})


//@route PUT api/notes/:categoryId/:noteId
//@desc return a note in category
//@access Public
router.put('/:categoryId/:noteId', async (req, res) => {
    const { categoryId, noteId } = req.params
    const { title, body, authorId, tagId } = req.body
    try {
        const note = await prisma.note.update({
            where: {
                id: noteId
            },
            data: {
                title,
                body,
                authorId,
                tagId,
                categoryId
            }
        })
        return res.json(note)
    } catch (error) {
        throw res.status(400).json({ error })
    }
})

//@route DELETE api/notes/:categoryId/:noteId
//@desc return a note in category
//@access Public
router.delete('/:noteId', async (req, res) => {
    const { noteId } = req.params
    try {
        await prisma.note.delete({
            where: {
                id: noteId
            }
        })
        return res.status(204)
    } catch (error) {
        res.status(404).json({ success: false })
    }
})


export default router;