const logout = async (req: any, res: any) => {
  const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? "";
  try {
    await res.clearCookie("accessToken", {
      domain: accessTokenCookieDomain,
      httpOnly: true,
    });
    res.status(200).json("Logged out.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export default logout;
