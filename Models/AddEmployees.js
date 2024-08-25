let mongoose=require('mongoose')

let exployeesSchema=new mongoose.Schema({
    name:String,
    email:String,

    // city:String,

    password:String,

    confirmPassword:String,

    phoneNumber:Number,
    status:{
        enum:["active","inactive"],
    },

    role: {
        type: String,
       
    }
})
module.exports=mongoose.model("Employees",exployeesSchema)