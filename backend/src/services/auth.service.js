import express from 'express'
import issueJWT from '../utils/jwt.js'
import bcrypt from 'bcryptjs'
import app_logger from '../utils/logger/App_logger.js'
import user_model from '../models/users.js'

export const SignUpService = async (email, username, password) => {

    try {

        app_logger.info(`SignUp Attempt for email ${email}`)

        const existinguser = await user_model.findOne({ email: email })

        if (existinguser) {
            app_logger.warn(`Attempt to register already existing email: ${email}`)
            throw new Error("Email already registered")
        }

        const username_check = await user_model.findOne({

            username: username

        })

        if (username_check) {
            app_logger.warn(`Attempt to register already existing username: ${username}`)
            throw new Error("Username already taken")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await user_model.create({
            email,
            username,
            password: hashedPassword
        });

        logger.info(`User created successfully: ${user.id}`);


        return { user };

    }
    catch (er) {

        throw new Error("Error Occured ", er)

    }

}

export const SignInService = async (email, password) => {

    try {

        app_logger.info(`SingIn Attempt for email ${email}`)

        const check_email = await user_model.findOne( { email: email } );

        if (!check_email) {
            throw new Error(`Email Not found`)
        }

        const check_password = await bcrypt.compare(password, check_email.password);

        if (!check_password) {

            throw new Error(`Password is Wrong for the email`)

        }

        const token = issueJWT({ user_id: user.id, username: username, email: email });

        return { user, token }





    }
    catch (er) {

        logger.error(`SignInService error for email ${email}: ${er.message}`);

        throw new Error("Error Occured ", er)

    }
}