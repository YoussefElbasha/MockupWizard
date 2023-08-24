import passport from "passport"

const loginGoogleCallback = async (req: any, res: any) => {
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/dashboard",
        failureRedirect: "http://localhost:3000/signin",
      })
}

export default loginGoogleCallback