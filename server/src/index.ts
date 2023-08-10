import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'
import  userRouter  from './routes/user'
import cookieParser from 'cookie-parser'
declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient,
        }
    }
  }
}

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/user',userRouter)

app.use((req, res, next) => {
  req.context = {
    prisma: new PrismaClient(),
  }
  next()
})

app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`)
})

export default app