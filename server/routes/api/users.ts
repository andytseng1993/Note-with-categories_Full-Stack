import { PrismaClient } from "@prisma/client";
import express from 'express'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const router = express.Router()
const prisma = new PrismaClient()

//@route POST api/users
//@desc Register user
//@access Public
router.post('/',async(req,res)=>{
    dotenv.config()
    const {email,name,password} = req.body
    if(!email||!name||!password) res.status(400).json('Please enter all fields.')
    
    //Create salt & hash
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt, async(err,hash)=>{
            if(err) throw err
            try {
                const user = await prisma.user.create({
                data:{
                    email,
                    name,
                    password: hash
                }
                })
                const secret: string = process.env.PRIVATE_KEY ?? 'secret'
                jwt.sign({id:user.id}, secret ,{expiresIn: '1h'},
                (err,token)=>{
                    if(err) throw err
                    return res.json({
                        token,
                        user:{
                            email:user.email,
                            name:user.name
                        }
                    })
                })
            } catch (error) {
                res.status(404).json({error:`Email already exists.`})
            }
        })
    }) 
})

export default router