const GOOGLE_CLIENT_ID: any = process.env.GOOGLE_CLIENT_ID;

const loginGoogle = (req: any, res: any) => {
  const googleOAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(
      "http://localhost:4000" + "/auth/google/callback"
    )}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;

  res.redirect(googleOAuthUrl);
};

export default loginGoogle;
