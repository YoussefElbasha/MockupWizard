import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as bodyParser from 'body-parser'

dotenv.config()
const app = express()
const port = process.env.PORT
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`)
})

export default app