import generateOTP from "../lib/otp";
import bcrypt from "bcrypt";
import createAuthToken from "../lib/create-auth-token";

const otplogin = async (req: any, res: any) => {
  const { email } = req.body;
  const { prisma } = req.context;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    res.status(400).json("User not found.");
    return;
  }
  const otp = await generateOTP(user, prisma);
  //send otp to email
  res.status(200).json(otp);
};

const otpverify = async (req: any, res: any) => {
  const { code, email } = req.body;
  const { prisma } = req.context;
  const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? "";
  const user = await prisma.user.findUnique({
    where: { email },
  });
  try {
    if (!user) {
      res.status(400).json("User not found.");
      return;
    }
    const otp = await prisma.otp.findFirst({
      where: { code, userId: user.id },
    });
    if (!otp) {
      res.status(400).json("Invalid OTP.");
      return;
    }
    if (otp.expiryDate < new Date()) {
      res.status(400).json("OTP expired.");
      return;
    }
    const token = createAuthToken(user.id);
    await prisma.otp.delete({
      where: {
        id: otp.id,
      },
    });

    res.status(200).json({ token, user });
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

const logout = async (req: any, res: any) => {
  const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? "";
  await res.clearCookie("accessToken", {
    domain: accessTokenCookieDomain,
    httpOnly: true,
    secure: true,
  });
  res.status(200).json("Logged out.");
};
const login = async (req: any, res: any) => {
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
    maxAge: 3600000,
    httpOnly: true,

    domain: accessTokenCookieDomain,
  });
  res.cookie("refreshToken", token.refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ token, user });
};
const register = async (req: any, res: any) => {
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
};

export { otplogin, otpverify, logout, login, register };
