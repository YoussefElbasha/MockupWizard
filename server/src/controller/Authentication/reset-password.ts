import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { jwt: jwtToken, password } = req.body
    const { prisma } = req.context

    if (!password)
      return res.status(400).json({
        error: 'Password is required'
      })

    if (password.length < 8)
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      })

    if (!jwtToken)
      return res.status(400).json({
        error: 'No token provided'
      })

    const decoded = jwt.verify(
      jwtToken,
      process.env.RESET_PASSWORD_KEY as string
    )

    const user = await prisma.user.findUnique({
      where: {
        id: (decoded as any).userId
      }
    })

    if (!user)
      return res.status(400).json({
        error: 'Invalid token'
      })

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword
      }
    })

    return res.status(200).json({
      success: true,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: 'Something went wrong'
    })
  }
}

export default resetPassword