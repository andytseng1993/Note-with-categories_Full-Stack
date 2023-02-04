import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const secret: string = process.env.PRIVATE_KEY ?? 'secret'
dotenv.config()
interface RequestWithId extends Request {
  user?: UserId
}
interface UserId {
  id: string
}

const authMiddleware = (req: RequestWithId, res: Response, next: NextFunction) => {
  if (!req.cookies._session_Id) return res.status(401).json('No cookie, authorization denied')
  try {
    const decode = jwt.verify(req.cookies._session_Id, secret) as UserId
    req.user = decode
    next()
  } catch (error) {
    res.status(400).json('Token is not valid')
  }
}

export default authMiddleware