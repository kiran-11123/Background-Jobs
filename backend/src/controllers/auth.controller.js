import { SignInService, SignUpService } from "../services/auth.service.js";
import app_logger from "../utils/logger/App_logger.js";


// ---------------------- SIGN-IN CONTROLLER ----------------------
export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Call service
        const { user, token } = await SignInService(email, password);

        app_logger.info(`Signin successful for user: ${user.username}`);

        // Set cookie token
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    }
    catch (er) {
        app_logger.error(`Signin error for ${req.body.email}: ${er.message}`);

        if (er.message === "Email Not found") {
            return res.status(404).json({ message: "Email not found. Please register first." });
        }

        if (er.message === "Password is Wrong for the email") {
            return res.status(401).json({ message: "Incorrect password. Please try again." });
        }

        return res.status(500).json({
            message: "Internal Server Error",
            error: er.message
        });
    }
};



// ---------------------- SIGN-UP CONTROLLER ----------------------
export const Signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Call service
        await SignUpService(email, username, password);

        app_logger.info(`Registration successful for user: ${username}`);

        return res.status(201).json({
            message: "Registration Successful"
        });
    }
    catch (er) {
        app_logger.warn(`Signup error: ${er.message}`);

        if (er.message === "Email already registered") {
            return res.status(400).json({ message: "Email already exists." });
        }

        if (er.message === "Username already taken") {
            return res.status(400).json({ message: "Username already taken." });
        }

        return res.status(500).json({
            message: "Internal Server Error",
            error: er.message
        });
    }
};
