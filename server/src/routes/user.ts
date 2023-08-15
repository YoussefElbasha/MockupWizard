import express from 'express'


const router = express.Router();

import {login,logout,otplogin, register} from '../controller/user';

router.post('/login',login);
router.post('/register',register);
// router.post('/login/google',loginGoogle);
// router.post('/login/facebook',loginFacebook);
router.post('/login/otp',otplogin);
router.get('/logout',logout);


export default router;