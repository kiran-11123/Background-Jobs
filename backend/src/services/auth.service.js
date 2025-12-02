import issueJWT from '../utils/jwt.js';
import bcrypt from 'bcryptjs';
import app_logger from '../utils/logger/App_logger.js';
import user_model from '../models/users.js';


// ---------------------- SIGN-UP SERVICE ----------------------
export const SignUpService = async (email, username, password) => {
    try {
        app_logger.info(`SignUp Attempt for email ${email}`);

        // Check email
        const existinguser = await user_model.findOne({ email });
        if (existinguser) {
            app_logger.warn(`Attempt to register already existing email: ${email}`);
            throw new Error("Email already registered");
        }

        // Check username
        const username_check = await user_model.findOne({ username });
        if (username_check) {
            app_logger.warn(`Attempt to register already existing username: ${username}`);
            throw new Error("Username already taken");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await user_model.create({
            email,
            username,
            password: hashedPassword,
        });

        app_logger.info(`User registration successful: ${user._id}`);

        return { user };
    }
    catch (er) {
        app_logger.error(`SignUpService Error: ${er.message}`);
        throw er;       // Controller will handle message
    }
};



// ---------------------- SIGN-IN SERVICE ----------------------
export const SignInService = async (email, password) => {
    try {
        app_logger.info(`SignIn Attempt for email ${email}`);

        // Check email
        const user = await user_model.findOne({ email });
        if (!user) {
            throw new Error("Email Not found");   // EXACT message used in controller
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Password is Wrong for the email");  // EXACT message used in controller
        }

        // Generate JWT
        const token = issueJWT({
            user_id: user._id,
            username: user.username,
            email: user.email,
        });

        return { user, token };
    }
    catch (er) {
        app_logger.error(`SignInService Error for ${email}: ${er.message}`);
        throw er;       // Controller will handle message
    }
};
