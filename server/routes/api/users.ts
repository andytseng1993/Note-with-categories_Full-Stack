import { PrismaClient } from "@prisma/client";
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()

//@route POST api/users
//@desc Register user
//@access Public
router.post('/',async(req,res)=>{
    const {email,name,password} = req.body
    await prisma.user.create({
        data:{
            email,
            name,
            password
        }
    })
})

export default router