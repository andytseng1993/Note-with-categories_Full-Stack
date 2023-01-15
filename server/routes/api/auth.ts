import { PrismaClient } from '@prisma/client'
import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()
const secret: string = process.env.PRIVATE_KEY ?? 'secret'

interface JwtPayload {
    id: string
}

//@route GET api/auth/user,
//@desc Auth user
//@access Public

router.get('/user', async (req, res) => {
    if (!req.cookies._session_Id) return res.status(401).json('No token, authorization denied')
    try {
        const decode = jwt.verify(req.cookies._session_Id, secret) as JwtPayload
        const user = await prisma.user.findUnique({
            where: {
                id: decode.id
            },
            select: {
                userName: true,
                email: true,
                registerAt: true
            }
        })
        return res.json(user)
    } catch (error) {
        res.status(400).json(error)
    }


})

export default router