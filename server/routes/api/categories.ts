import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//@route GET api/categories
//@desc All categories
//@access Public
router.get('/',async(req,res)=>{
    const category =await prisma.category.findMany()
    return res.json(category)
})

//@route POST api/categories
//desc return A category
//@access Public
router.post('/',async(req,res)=>{
    const {name} = req.body
    const category = await prisma.category.create({
        data:{
            name
        }
    })
    return res.json(category)
})

//@route PUT api/categories/:id
//@desc A category
//@access Public
router.put('/:id',async(req,res)=>{
    const {id,name} = req.body
    const category = await prisma.category.update({
        where:{
            id
        },
        data:{
            name
        }
    })
    return res.json(category)
})

//@route DELETE api/categories/:id
//@desc A category
//@access Public
router.delete('/:id',async(req,res)=>{
    const {id} = req.body
    const category = await prisma.category.delete({
        where:{id}
    })
    return res.json(category)
})

export default router