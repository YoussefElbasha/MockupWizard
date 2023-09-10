import bcrypt from "bcrypt";
import createAuthToken from "../../lib/create-auth-token";

const login = async (req: any, res: any) => {
  try {
    const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? "";
    const { email, password } = req.body;
    const { prisma } = req.context;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(400).json("User not found.");
      return;
    }
    if ((await bcrypt.compare(password, user.password)) === false) {
      res.status(400).json("Invalid password.");
      return;
    }
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

export default login;
