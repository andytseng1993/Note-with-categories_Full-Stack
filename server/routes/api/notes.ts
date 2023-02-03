import { PrismaClient } from "@prisma/client";
import express from 'express'
import authMiddleware from '../../middleware/authMiddleware';

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
                    label: true
                }
            },
            categories: {
                select: {
                    id: true
                }
            }

        }
    })
    return res.status(200).json(notes)
})

//@route GET api/notes/:noteId
//@desc return unique note
//@access Public
router.get('/:noteId', async (req, res) => {
    const { noteId } = req.params
    try {
        const notes = await prisma.note.findUnique({
            where: {
                id: noteId
            },
            select: {
                title: true,
                body: true,
                author: {
                    select: {
                        userName: true
                    }
                },
                editor: true,
                tags: {
                    select: {
                        id: true,
                        label: true
                    }
                },
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                createdAt: true,
                updateAt: true,
                lock: true
            }
        })
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

//@route POST api/notes/
//@desc return new note
//@access Private
interface PropsType {
    title: string
    body: string
    authorName: string
    categoryId: string
    tagIdArray: TagId[]
    lock: boolean
}
interface TagId {
    id: string
}
router.post('/', authMiddleware, async (req, res) => {
    const { title, body, authorName, tagIdArray, categoryId, lock }: PropsType = req.body
    try {
        await prisma.note.create({
            data: {
                title,
                body,
                authorName,
                tags: {
                    connect: tagIdArray
                },
                categoryId: categoryId,
                lock
            }
        })
        return res.status(201).json({ success: true })
    } catch (error) {
        res.status(404).json({ success: false })
    }
})


//@route PUT api/notes/:noteId
//@desc return a note in category
//@access Private
router.put('/:noteId', authMiddleware, async (req, res) => {
    const { noteId } = req.params
    const { lock, title, body, editor, tagIdArray, categoryId } = req.body
    try {
        const note = await prisma.note.update({
            where: {
                id: noteId
            },
            data: {
                title,
                body,
                editor,
                tags: { set: tagIdArray },
                categoryId,
                lock
            }
        })
        return res.json(note)
    } catch (error) {
        return res.status(400).json({ error })
    }
})


//@route DELETE api/notes/:noteId
//@desc return a note in category
//@access Private
router.delete('/:noteId', authMiddleware, async (req, res) => {
    const { noteId } = req.params
    try {
        await prisma.note.delete({
            where: {
                id: noteId
            }
        })
        return res.status(204).json({ success: true })
    } catch (error) {
        return res.status(404).json({ success: false })
    }
})


export default router;