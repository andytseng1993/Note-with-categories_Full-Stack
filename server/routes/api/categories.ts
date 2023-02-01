import express from 'express'
import { PrismaClient } from '@prisma/client'
import authMiddleware from '../../middleware/authMiddleware'

const router = express.Router()
const prisma = new PrismaClient()

//@route GET api/categories
//@desc All categories and notes _count
//@access Public
router.get('/', async (req, res) => {
    const category = await prisma.category.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: { select: { notes: true } }
        }
    })
    return res.json(category)
})

//@route GET api/categories/:id
//@desc All notes in one category
//@access Public
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const category = await prisma.category.findUnique({
            where: {
                id
            },
            select: {
                notes: {
                    select: {
                        id: true,
                        title: true,
                        body: true,
                        createdAt: true,
                        updateAt: true,
                        tags: {
                            select: {
                                id: true,
                                label: true
                            }
                        }
                    },
                    orderBy: {
                        updateAt: 'desc'
                    }
                }
            }
        })
        return res.json(category)
    } catch (error) {
        return res.status(404).json('Cannot find the category')
    }
})

//@route POST api/categories
//desc return A category
//@access Private
router.post('/', authMiddleware, async (req, res) => {
    const { name } = req.body
    if (name.trim() === '') return res.status(401).json('Please enter all fields.')
    const category = await prisma.category.create({
        data: {
            name
        }
    })
    return res.status(201).json(category)
})

//@route PUT api/categories/:id
//@desc A category
//@access Private
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const category = await prisma.category.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        return res.json(category)
    } catch (error) {
        res.status(404).json({ success: false })
    }
})

//@route DELETE api/categories/:id
//@desc A category
//@access Private
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params
    try {
        await prisma.category.delete({
            where: { id }
        })
        return res.status(204).json({ success: true })
    } catch (error) {
        res.status(404).json({ success: false })
    }

})

export default router