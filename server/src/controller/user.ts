import generateOTP from "../lib/otp";
import authService from "../services/auth.service";


const otplogin = async (req: any, res: any) => {
    const { email } = req.body
    const { prisma } = req
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
    // surround with try catch

    const { code, email } = req.body
    const { prisma } = req
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
    const token = authService.createAuthToken(user)
    await res.cookie('access', token, {
        domain: accessTokenCookieDomain,
        httpOnly: true,
        secure: true,
      })
      
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
    const { prisma } = req
    const user = await prisma.user.findUnique({
        where: { email },
    })
    if (!user) {
        res.status(400).json('User not found.')
        return
    }
    if (user.password !== password) {
        res.status(400).json('Invalid email or password.')
        return
    }
    const token = authService.createAuthToken(user)
    res.status(200).json({ token, user })
}
export default { otplogin, otpverify , logout, login }
