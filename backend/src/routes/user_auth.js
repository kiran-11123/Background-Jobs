import express from 'express'
const Auth_Router = express.Router();
import { Signin } from '../controllers/auth.controller.js';
import { Signup } from '../controllers/auth.controller.js';
import { ResetPasswordController , VerifyCodeController , ChangePasswordController } from '../controllers/auth.controller.js';

Auth_Router.post("/signin" , Signin)
Auth_Router.post("/signup" , Signup)
Auth_Router.post("/resetPassword" , ResetPasswordController);
Auth_Router.post("/verify-code" , VerifyCodeController);
Auth_Router.post("/change-password" , ChangePasswordController);











export default Auth_Router