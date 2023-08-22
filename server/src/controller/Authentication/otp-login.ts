import createAuthToken from "../../lib/create-auth-token";
import generateOTP from "../../lib/otp";
import sendOtp from "../../lib/sendEmail";

const otplogin = async (req: any, res: any) => {
  try {
    const { email } = req.body;
    const { prisma } = req.context;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(400).json("User not found.");
      return;
    }
    const otp = await generateOTP(user.id, prisma);
    await sendOtp(user.email, otp.code);
    res.status(200).json("OTP sent.");
  } catch (err) {
    res.status(400).json(err);
  }
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

    res.cookie("accessToken", token.accessToken, {
      maxAge: 3600000,
      httpOnly: true,
      domain: accessTokenCookieDomain,
    });
    res.status(200).json({ token, user });
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

export { otplogin, otpverify };
