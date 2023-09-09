import express from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import * as bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth";
import apiRouter from "./routes/app";
import cookieParser from "cookie-parser";
import isAuthenticated from "./middleware/auth.middleware";
import dashboardRouter from "./routes/dashboard";
import session from "express-session";
import EditorRouter from "./routes/editor";

declare global {
  namespace Express {
    interface Request {
      context: {
        prisma: PrismaClient;
      };
      userId?: string;
    }
  }
}

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", isAuthenticated);
app.use(
  session({
    secret: String(process.env.ACCESS_SECRET),
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  req.context = {
    prisma: new PrismaClient(),
  };
  next();
});

app.use("/auth", authRouter)
app.use("/api", apiRouter)
app.use("/dashboard", isAuthenticated, dashboardRouter)
app.use('/editor', EditorRouter)


app.listen(port, () => {
  console.log(`Listening on port ${port}: http://localhost:${port}`)
})

export default app

