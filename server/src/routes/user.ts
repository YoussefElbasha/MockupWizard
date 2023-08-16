import express from 'express'
import { login, logout, otplogin, register, loginGoogle, profile } from '../controller/user';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/login/google', loginGoogle);
// router.post('/login/facebook', loginFacebook);
router.post('/login/otp', otplogin);
router.get('/logout', logout);
router.get('/profile', profile);


export default router;