import { PrismaClient } from "@prisma/client";
import express from 'express'

const prisma = new PrismaClient()
const router = express.Router()

//@route GET api/notes
//@desc return All notes
//@access Public
router.get('/', async (req, res) => {
    const notes = await prisma.note.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            tags: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
    return res.json(notes)
})

//@route POST api/notes/
//@desc return new note
//@access Public
router.post('/', async (req, res) => {
    const { title, body, authorId, tagId, categoryId } = req.body
    try {
        await prisma.note.create({
            data: {
                title,
                body,
                authorId,
                tags: {
                    connect: {
                        id: tagId
                    }
                },
                categories: categoryId
            }
        })
        return res.status(201)
    } catch (error) {
        res.status(404).json({ success: false })
    }
})


//@route PUT api/notes/:categoryId/:noteId
//@desc return a note in category
//@access Public
router.put('/:categoryId/:noteId', async (req, res) => {
    const { categoryId, noteId } = req.params
    const { title, body, authorId, setTagsIdArray } = req.body
    try {
        const note = await prisma.note.update({
            where: {
                id: noteId
            },
            data: {
                title,
                body,
                authorId,
                tags: { set: setTagsIdArray },
                categoryId
            }
        })
        return res.json(note)
    } catch (error) {
        throw res.status(400).json({ error })
    }
})


//@route DELETE api/notes/:noteId
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