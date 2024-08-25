let mongoose = require('mongoose');

let administrator=new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
type:"String",
unique:"true",
    }  ,
    
    phoneNumber: Number,
    
    
    password:String,
    status:String,

    // status: {
    //     type: Boolean,
    //     // enum: ['active', 'inactive'],
    // },
    confirmPassword:String,
    
});

module.exports = mongoose.model('AdministratorCollection', administrator);
