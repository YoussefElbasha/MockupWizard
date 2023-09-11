import express from "express";
import login from "../controller/Authentication/login";
import register from "../controller/Authentication/register";
import { otplogin, otpverify } from "../controller/Authentication/otp-login";
import logout from "../controller/Authentication/logout";
import loginGoogle from "../controller/Authentication/loginGoogle";
import loginGoogleCallback from "../controller/Authentication/loginGoogleCallback";
import forgotPassword from "../controller/Authentication/forgot-password";
import verifyForgotPasswordJWT from "../controller/Authentication/forgot-password-verify";
import resetPassword from "../controller/Authentication/reset-password";
// import loginGoogle from '../controller/Authentication/loginGoogle';
// import loginFacebook from '../controller/Authentication/loginFacebook';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/google", loginGoogle);
router.get("/google/callback", loginGoogleCallback);
router.post("/login/otp", otplogin);
router.post("/otpverify", otpverify);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/verify", verifyForgotPasswordJWT);
router.post("/forgot-password/reset", resetPassword);

export default router;
