let mongoose = require('mongoose');

let usermodel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    companyname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    contactnumber: {
        type: Number,
    },
  

        image: {
            type: String, // Assuming you're storing a URL or base64 encoded string

        },
    
    password: {
        type: String,
    },
    confirmpassword:{
        type:String,

    },
    licenseSchema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "License",
        // require:true,
      },
    //   admin:{
    //     type:String,
    //     required:"true",
    //     role:"superadmin"
        
    //   },

      
        resetToken: String,
resetTokenExpiry: Date
    
      
  
});

module.exports = mongoose.model('CompanyData', usermodel);







