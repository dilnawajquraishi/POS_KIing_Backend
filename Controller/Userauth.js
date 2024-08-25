


let express = require('express');
let userAuth = require('../Models/User');
const cookieParser = require('cookie-parser');
let jwt = require('jsonwebtoken');


require('dotenv').config();
let multer = require('multer')
let multerConfig=require('../MulterConfig')

let bcrypt = require('bcryptjs');

// const userAuth = require('../models/userAuth'); // Your User model

const userRegistration = async (req, res) => {
    const { username, companyname, email, password, contactnumber, image } = req.body;

    try {
        let userDetails = await userAuth.findOne({ email: email });

        if (!userDetails) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            let details = await userAuth.create({
                username: username,
                image: image, // or req.file.filename if you're using Multer
                email: email,
                password: hashPassword,
                companyname: companyname,
                contactnumber: contactnumber
            });

            // Create a token
            const token = jwt.sign(
                { userId: details._id, email: details.email },
                process.env.your_jwt_secret, // Your JWT secret
                { expiresIn: '1h' } // Token expiration time
            );

            return res.status(200).json({
                success: true,
                msg: "User created successfully",
                details,
                token // Include the token in the response
            });
        } else {
            return res.status(400).json({ success: false, msg: "User already exists!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Error in creating user", error: error.message });
    }
};

module.exports = { userRegistration };


// ------------------------------Login--------------------------------------------------
let userSigninController=async (req, res) =>{
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error('Please provide email');
        }
        if (!password) {
            throw new Error('Please provide password');
        }

        const signinUser = await userAuth.findOne({ email });

        if (!signinUser) {
            throw new Error('User not found');
        }

        // Check if the current date is within the license period
        const currentDate = new Date();
        if (signinUser.licenseKey && signinUser.fromDate <= currentDate && signinUser.toDate >= currentDate) {
            // License is valid, proceed with login without license key verification
            const checkPassword = await bcrypt.compareSync(password, signinUser.password);

            if (checkPassword) {
                const tokenData = {
                    _id: signinUser._id,
                    email: signinUser.email
                };

                const token = await jwt.sign(tokenData, process.env.your_jwt_secret, { expiresIn: 60 * 60 * 12 });
                

                const tokenOption = {
                    httpOnly: true,
                    secure: true
                };

                res.cookie('token', token, tokenOption).status(200).json({
                    message: 'User logged in successfully',
                    data: {
                        token: token,
                        profile: {
                            name: signinUser.username,
                            companyname: signinUser.companyname,
                            email: signinUser.email,
                            image: signinUser.image
                        }
                    },
                    success: true,
                    error: false
                });

            } else {
                throw new Error('Please check your password');
            }
        } else {
            throw new Error('License key is required or expired');
        }

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}















// _____________Reset Password------------------

// const User = require('../models/User'); // Your User model

const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Find the user by their ID or another identifier
    const user = await userAuth.findById(req.user.id); // Assuming you have user ID in `req.user.id`

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user with the new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};








// --------------------Middleware_Reset password--------------------


const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.your_jwt_secret, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;




// -----------------------Logout---------------------------

let userLogoutController=async(req, res) => {
    res.clearCookie('token').status(200).json({
        message: 'User logged out successfully',
        success: true,
        error: false
    });
    
};















module.exports = {
    userRegistration,
    userSigninController,
    userLogoutController,
    resetPassword
}
