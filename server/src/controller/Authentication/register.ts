import createAuthToken from "../../lib/create-auth-token";
import bcrypt from "bcrypt";

const register = async (req: any, res: any) => {
  try {
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? "";
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
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      domain: accessTokenCookieDomain,
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default register;
