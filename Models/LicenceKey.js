// const mongoose = require('mongoose');
// const crypto = require('crypto');

// // Function to validate license key format
// function validateLicenseKey(value) {
//     const regex = /^(?=(?:.*[A-Za-z]){4})(?=(?:.*\d){4})(?=(?:.*[!@#$%^&*()]){4})[A-Za-z\d!@#$%^&*()]{12}$/;
//     return regex.test(value);
// }


// // Define the schema
// const licenseSchema = new mongoose.Schema({
//     licenseKey: {
//         type: String,
//         required: true,
//         validate: [validateLicenseKey, 'Invalid license key format. It must be 16 characters long with 4 letters, 4 numbers, and 4 special characters.']
//     },
//     fromDate: { type: Date },
//     toDate: { type: Date },
//     role: {
//         type: String,
//         enum: ['user', 'superadmin'], // Define roles here
//         // required:"true"
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     companyname: {
//         type: String,
//         required: true
//     }
// });

// // Create the model
// License = mongoose.model('License', licenseSchema);

// // module.exports = License;















const mongoose = require('mongoose');

// Function to validate license key format
function validateLicenseKey(value) {
    const regex = /^(?=(?:.*[A-Za-z]){4})(?=(?:.*\d){4})(?=(?:.*[!@#$%^&*()]){4})[A-Za-z\d!@#$%^&*()]{12}$/;
    return regex.test(value);
}

// Define the schema
const licenseSchema = new mongoose.Schema({
    licenseKey: {
        type: String,
        required: true,
        validate: [validateLicenseKey, 'Invalid license key format. It must be 16 characters long with 4 letters, 4 numbers, and 4 special characters.']
    },
    fromDate: { type: Date },
    toDate: { type: Date },
    role: {
        type: String,
        enum: ['user', 'superadmin'], // Define roles here
        required: true  // Ensure that the role is required
    },
    username: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    }
});

const License = mongoose.model('License', licenseSchema);

module.exports = License;
