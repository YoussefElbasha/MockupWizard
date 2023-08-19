import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";
import { PrismaClient, User } from "@prisma/client";
import userRouter from "./routes/user";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
require('./lib/google-auth');

declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient;
      };
    }
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID: any = process.env.GOOGLE_CLIENT_ID;

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Enable cookies and session sharing
}));



app.use((req, res, next) => {
  req.context = {
    prisma: new PrismaClient(),
  };
  next();
});

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/login/google", (req, res) => {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fprofile&scope=profile%20email&client_id=${GOOGLE_CLIENT_ID}`;
    res.json({ redirectUrl: googleOAuthUrl });
  } 
)

//app.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }))


app.get(
  "/profile",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/profile",
    failureRedirect: "http://localhost:3000/signin",
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`);
});

export default app;
