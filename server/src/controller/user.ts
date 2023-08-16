import generateOTP from "../lib/otp";
import bcrypt from 'bcrypt'
import createAuthToken from "../lib/create-auth-token";
import passport from 'passport'

const otplogin = async (req: any, res: any) => {
    const { email } = req.body
    const { prisma } = req.context
    const user = await prisma.user.findUnique({
        where: { email },
    })
    if (!user) {
        res.status(400).json('User not found.')
        return
    }
    const otp = await generateOTP(user, prisma)
    //send otp to email
    res.status(200).json(otp)
}

const otpverify = async (req: any, res: any) => {
    const { code, email } = req.body
    const { prisma } = req.context
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''
    const user = await prisma.user.findUnique({
        where: { email },
    })
    try {
    if (!user) {
        res.status(400).json('User not found.')
        return
    }
    const otp = await prisma.otp.findFirst({
        where: { code, userId: user.id },
    })
    if (!otp) {
        res.status(400).json('Invalid OTP.')
        return
    }
    if (otp.expiryDate < new Date()) {
        res.status(400).json('OTP expired.')
        return
    }
    const token = createAuthToken(user.id)
    //  
      await prisma.otp.delete({
        where: {
          id: otp.id,
        },
      })
  
    res.status(200).json({ token, user })
    } catch (e: any) {
        res.status(400).json(e.message)
    }
}

const logout = async (req: any, res: any) => {
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? ''
    await res.clearCookie('access', {
        domain: accessTokenCookieDomain,
        httpOnly: true,
        secure: true,
        })
    res.status(200).json('Logged out.')
}
const login = async (req: any, res: any) => {
    const { email, password } = req.body
    const { prisma } = req.context
    const user = await prisma.user.findUnique({
        where: { email },
    })
    if (!user) {
        res.status(400).json('User not found.')
        return
    }
    if (await bcrypt.compare(password, user.password) === false) {
        res.status(400).json('Invalid email or password.')
        return
    }
    const token = createAuthToken(user.id)
    res.status(200).json({ token, user })
}
const register = async (req: any, res: any) => {
    const { email, password, name } = req.body
    const { prisma } = req.context
    const existingUser = await prisma.user.findUnique({
        where: { email },
    })
    if (existingUser) {
        res.status(400).json('User already exists.')
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    })
    const token = createAuthToken(user.id)
    res.status(200).json({ token, user })
}

const loginGoogle = async (req: any, res: any) => {
    //passport.authenticate('google', { scope: [ 'email', 'profile' ] })
    const GOOGLE_CLIENT_ID: any = process.env.GOOGLE_CLIENT_ID;
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A2000%2Fprofile&scope=profile%20email&client_id=${GOOGLE_CLIENT_ID}`;
    res.json({ redirectUrl: googleOAuthUrl });
}

const profile = async (req: any, res: any) => {
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000/profile',
        failureRedirect: 'https://facebook.com'
      })
}    

export { otplogin, otpverify, logout, login, register, loginGoogle, profile}
