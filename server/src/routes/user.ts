import express from "express";
import login from "../controller/Authentication/login";
import register from "../controller/Authentication/register";
import { otplogin, otpverify } from "../controller/Authentication/otp-login";
import logout from "../controller/Authentication/logout";
// import loginGoogle from '../controller/Authentication/loginGoogle';
// import loginFacebook from '../controller/Authentication/loginFacebook';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
// router.post('/login/google',loginGoogle);
// router.post('/login/facebook',loginFacebook);
router.post("/otp", otplogin);
router.post("/otp/verify", otpverify);
router.get("/logout", logout);

export default router;
