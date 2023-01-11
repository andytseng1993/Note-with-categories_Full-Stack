import { PrismaClient } from "@prisma/client";
import express from 'express'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()
const secret: string = process.env.PRIVATE_KEY ?? 'secret'
//@route POST api/users
//@desc Register user
//@access Public
router.post('/', async (req, res) => {
    const { email, name, password } = req.body
    if (!email || !name || !password) res.status(400).json('Please enter all fields.')

    //Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) throw err
            try {
                const user = await prisma.user.create({
                    data: {
                        email,
                        name,
                        password: hash
                    }
                })

                jwt.sign({ id: user.id }, secret, { expiresIn: '1h' },
                    (err, token) => {
                        if (err) throw err
                        return res.status(201)
                            .cookie('_session_Id', token, {
                                secure: true,
                                httpOnly: true,
                                sameSite: "none",
                                maxAge: 360000
                            })
                            .json({
                                user: {
                                    email: user.email,
                                    name: user.name
                                }
                            })
                    })
            } catch (error) {
                res.status(404).json({ error: `Email already exists.` })
            }
        })
    })
})


//@route POST api/users/login
//@desc Login user
//@access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json('Please enter all fields.')
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) return res.status(400).json('Cannot find user!')
    try {
        bcrypt.compare(password, user.password)
            .then(isMach => {
                if (!isMach) return res.status(400).json('Invalid credentials')

                jwt.sign({ id: user.id }, secret, { expiresIn: '1h' },
                    (err, token) => {
                        if (err) throw err
                        return res.status(201)
                            .cookie('_session_Id', token, {
                                secure: true,
                                httpOnly: true,
                                sameSite: "none",
                                maxAge: 360000
                            })
                            .json({
                                user: {
                                    email: user.email,
                                    name: user.name
                                }
                            })
                    })
            })
    } catch (error) {
        res.status(500)
    }

})

export default router