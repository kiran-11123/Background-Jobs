import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import app_logger from './logger/App_logger.js'
const JWT_SECRET = process.env.JWT_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export function issueJWT(user) {
    const payload = {
        user_id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    app_logger.info(`JWT issued for ${user.username}`);
    return token;
}

 export function resetIssueJWT(user) {
    const payload = {
        user_id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    app_logger.info(`JWT issued for ${user.username}`);
    return token;
}

