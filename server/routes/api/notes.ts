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

export default router;