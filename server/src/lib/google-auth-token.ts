import axios from "axios";
import qs from "qs";

const getGoogleOAuthTokens = async (code: string) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.FRONTEND_URL}/auth/google/callback`,
    grant_type: "authorization_code",
  };

  const { data } = await axios.post(url, qs.stringify(values), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return {
    accessToken: data.access_token,
    idToken: data.id_token,
  };
};

export default getGoogleOAuthTokens;
