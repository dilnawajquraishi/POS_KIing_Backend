let express=require('express')
let superadmin=require('../Models/LicenceKey')

// const licensekey = async (req, res) => {
//     let { username, companyname, licenseKey,toDate,fromDate} = req.body;
//    try {
//     let addadmin=await superadmin.create({
//         username:username,
//         companyname:companyname,
//         licenseKey:licenseKey,
//         toDate:toDate,
//         fromDate:fromDate,
//     })
//     return  res.status(200).json({success:true ,message:"created successfully",addadmin})
//    } catch (error) {
//  return res.status(200).json({success:false,error:error.message})
//    }
// }



const User = require('../Models/User');  // Import the User model

const licensekey = async (req, res) => {
    let { username, companyname, licenseKey, toDate, fromDate } = req.body;
    try {
        // Create the license key
        let addadmin = await superadmin.create({
            username,
            companyname,
            licenseKey,
            toDate,
            fromDate,
        });

        // Update the user's schema with license details
        await User.updateOne({ username }, {
            $set: {
                licenseKey,
                toDate,
                fromDate,
            }
        });

        return res.status(200).json({ success: true, message: "Created successfully", addadmin });
    } catch (error) {
        return res.status(200).json({ success: false, error: error.message });
    }
};

// ---------------------


const crypto = require('crypto');
const License = require('../Models/LicenceKey');
// const User = require('../Models/User');

// Function to generate a license key
function generateLicenseKey() {
    return crypto.randomBytes(8).toString('hex'); // Example for generating a 16-character license key
}

const licensekeygenerate = async (req, res) => {
    let { username, companyname, toDate, fromDate } = req.body;
    try {
        // Generate the license key
        const licenseKey = generateLicenseKey();

        // Create the license key entry
        let addadmin = await License.create({
            username,
            companyname,
            licenseKey,
            toDate,
            fromDate,
            // role
        });

        // Update the user's schema with license details
        await User.updateOne({ username }, {
            $set: {
                licenseKey,
                toDate,
                fromDate,
            }
        });

        return res.status(200).json({ success: true, message: "Created successfully", addadmin });
    } catch (error) {
        return res.status(400).json({ success: false, msg: "Error in creating user", error: error.message });
    }
};







module.exports={
    licensekey,
    licensekeygenerate
}