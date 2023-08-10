import express from 'express'

import { login, otplogin, logout } from '../controller/user'
const router = express.Router();

router.post('/login',login);
router.post('/register',register);
router.post('/login/google',loginGoogle);
router.post('/login/facebook',loginFacebook);
router.post('/login/otp',loginotp);
router.get('/logout',logout);


export default router;