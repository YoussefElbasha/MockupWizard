import createAuthToken from "../../lib/create-auth-token";
import bcrypt from "bcrypt";

const register = async (req: any, res: any) => {
  try {
    const { email, password, username } = req.body;
    const { prisma } = req.context;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json("User already exists.");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    const token = createAuthToken(user.id);
    res.cookie("accessToken", token.accessToken, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", token.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json(err);
  }
}

export default register;
