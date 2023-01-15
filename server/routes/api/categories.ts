import express from 'express'
import { PrismaClient } from '@prisma/client'

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

//@route POST api/categories
//desc return A category
//@access Public
router.post('/', async (req, res) => {
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
//@access Public
router.put('/:id', async (req, res) => {
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
//@access Public
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await prisma.category.delete({
            where: { id }
        })
        return res.status(204)
    } catch (error) {
        res.status(404).json({ success: false })
    }

})

export default router