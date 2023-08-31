import createAuthToken from "../../lib/create-auth-token";
import getGoogleOAuthTokens from "../../lib/google-auth-token";
import getGoogleOAuthUserInfo from "../../lib/google-auth-user-info";

const googleOAuthCallback = async (req: any, res: any) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Code not provided");
    }

    const { accessToken, idToken } = await getGoogleOAuthTokens(code as string);
    const userInfo = await getGoogleOAuthUserInfo(accessToken, idToken);

    const { email, name, picture } = userInfo;

    const user = await req.context.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const token = createAuthToken(user.id);
      res.cookie("accessToken", token.accessToken, {
        maxAge: 3600000,
        httpOnly: true,
      });
      return res.redirect("http://localhost:3000/dashboard");
    } else {
      const newUser = await req.context.prisma.user.create({
        data: {
          email: email,
          username: name,
          picture: picture,
        },
      });
      const token = createAuthToken(newUser.id);
      res.cookie("accessToken", token.accessToken, {
        maxAge: 3600000,
        httpOnly: true,
      });
      return res.redirect("http://localhost:3000/dashboard");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

export default googleOAuthCallback;
