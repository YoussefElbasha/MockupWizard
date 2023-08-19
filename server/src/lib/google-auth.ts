import { PrismaClient, User } from "@prisma/client";
import passport from "passport";
import passportGoogle from "passport-google-oauth20";

const GoogleStrategy = passportGoogle.Strategy;
const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID: any = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: any = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user: any , done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/profile",
      passReqToCallback: true,
    },
     async (request, accessToken, refreshToken, profile, done) => {
      const user: any = await prisma.user.findUnique({
        where: { email: profile.emails![0].value },
      });
      //return done(null, profile);
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            username: profile.displayName,
            email: profile.emails![0].value,
          },
        });

        if (newUser) {
          done(null, newUser);
        } else {
          done(null, user);
        }
      }
    }
  )
);


