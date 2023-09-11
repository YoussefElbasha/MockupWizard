import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const verifyForgotPasswordJWT = async (req: Request, res: Response) => {
  try {
    const { jwt: jwtToken } = req.body
    const { prisma } = req.context

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

    return res.status(200).json({
      email: user.email
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: 'Something went wrong'
    })
  }
}

export default verifyForgotPasswordJWT