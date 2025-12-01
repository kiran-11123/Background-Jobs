import express from 'express'
const Auth_Router = express.Router();
import { Signin } from '../controllers/auth.controller.js';
import { Signup } from '../controllers/auth.controller.js';


Auth_Router.post("/signin" , Signin)
Auth_Router.post("/signup" , Signup)











export default Auth_Router