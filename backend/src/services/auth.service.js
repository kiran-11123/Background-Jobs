import issueJWT from '../utils/jwt.js';
import bcrypt from 'bcryptjs';
import app_logger from '../utils/logger/App_logger.js';
import user_model from '../models/users.js';
import transporter from '../utils/Nodemailer.js';

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
        const token = issueJWT(user);

        return { user, token };
    }
    catch (er) {
        app_logger.error(`SignInService Error for ${email}: ${er.message}`);
        throw er;       // Controller will handle message
    }
};

export const ResetPassword = async (email) => {
  app_logger.info(`Entered into the ResetPassword Service`);

  try {
    // 1️⃣ Check if user exists
    const find_user = await user_model.findOne({ email });
    if (!find_user) {
      throw new Error(`User Not Found`);
    }

    // 2️⃣ Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000); // 100000–999999

    // 3️⃣ Set expiry (15 minutes)
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    // 4️⃣ Update user record with OTP + expiry
    find_user.resetPasswordToken = code;
    find_user.resetPasswordExpiry = expiry;

    await find_user.save();

    // 5️⃣ Send reset email (can be async or queued)
    await transporter.sendEmail({
      to: email,
      subject: "Password Reset Code",
      html: `
        <p>Your password reset code is:</p>
        <h2>${code}</h2>
        <p>This code will expire in <strong>15 minutes</strong>.</p>
      `
    });

    app_logger.info(`Password reset code sent to ${email}`);

    return {
      message: "Password reset OTP sent successfully",
      email,
    };
  } catch (er) {
    app_logger.error(`Error in ResetPassword service: ${er.message}`);
    throw er;
  }
};


export const VerifyCodeService = async(email , code)=>{
    
    app_logger.info(`Entered into the VerifyCodeService `)
    try{
          
        const find_user = await user_model.findOne({email});

        if(!find_user){
            throw new Error(`User Not Found`)
        }

        if(find_user.resetPasswordExpiry <Date.now()){
             throw new Error(`Code Time Expired`)
        }

        if(find_user.resetPasswordToken !== code){
            throw new Error(`Code is wrong`)
        }

      
        
        return email ; 


    }
    catch(er){
         throw er;
    }
}

export const ChangePassword = async(email , password )=>{
       
    try{

        app_logger.info(`Entered into the ChangePasswordService`)

        const find_email = await user_model.findOne({email});

        if(!find_email){
             throw new Error(`User Not Found`)
        }
        const hashedPassword = await bcrypt.hash(password , 10);

        find_email.password = hashedPassword;
        await find_email.save();

        return {
      success: true,
      message: "Password changed successfully",
    };

    }
    catch(er){
         throw er;
    }
}    