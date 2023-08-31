import axios from "axios";

const getGoogleOAuthUserInfo = async (accessToken: string, idToken: string) => {
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return data;
};

export default getGoogleOAuthUserInfo;
