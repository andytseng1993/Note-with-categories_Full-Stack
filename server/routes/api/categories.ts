import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//@route GET api/categories
//@desc All categories
//@access Public
router.get('/',async(req,res)=>{
    const categories = await prisma.category.findMany()
    return res.json(categories)
})

export default router