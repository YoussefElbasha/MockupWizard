import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'
import  userRouter  from './routes/user'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'

require('./lib/facebook-auth')

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
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the appropriate origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors({
  origin:'http://localhost:3000',          
  credentials: true, 
}));

app.use((req, res, next) => {
  req.context = {
    prisma: new PrismaClient(),
  }
  next()
})
app.use('/user',userRouter)


app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'https://facebook.com', failureRedirect: 'https://twitter.com' })
);


app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`)
})

export default app