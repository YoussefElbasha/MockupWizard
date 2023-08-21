import { PrismaClient, User } from "@prisma/client";
import passport from "passport";
import passportFacebook from "passport-facebook";

const FacebookStrategy = passportFacebook.Strategy;
const prisma = new PrismaClient();

const FACEBOOK_CLIENT_ID: any = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET: any = process.env.FACEBOOK_CLIENT_SECRET;

passport.serializeUser((user: any , done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/login/facebook/callback",
      passReqToCallback: true,
    },
     async (request, accessToken, refreshToken, profile, done) => {
      process.nextTick(async () => {
      const user: any = await prisma.user.findUnique({
        where: { id: profile.id },
      });
      //return done(null, profile);
      if (!user) {
        
        const newUser = await prisma.user.create({
          data: {
            username: profile.displayName,
            email: profile.emails![0].value
          },
        });

        if (newUser) {
          done(null, newUser);
        } else {
          done(null, user);
        }
      }
    })}
  )
);