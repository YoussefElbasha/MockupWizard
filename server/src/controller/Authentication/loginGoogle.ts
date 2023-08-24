const GOOGLE_CLIENT_ID: any = process.env.GOOGLE_CLIENT_ID;

const loginGoogle = (req: any, res: any) => {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fprofile&scope=profile%20email&client_id=${GOOGLE_CLIENT_ID}`;
    res.json({ redirectUrl: googleOAuthUrl });
}    

export default loginGoogle