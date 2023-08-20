const logout = async (req: any, res: any) => {
  const accessTokenCookieDomain = process.env.ACCESS_TOKEN_COOKIE ?? "";
  await res.clearCookie("accessToken", {
    domain: accessTokenCookieDomain,
    httpOnly: true,
  });
  res.status(200).json("Logged out.");
};

export default logout;
