let mongoose=require('mongoose')

let CustomerSchema=new mongoose.Schema({
    name:String,

    email:String,

    password:String,

    confirmPassword:String,

    phoneNumber:Number,
    status:{
        enum:["active","inactive"],
    },

   
})
module.exports=mongoose.model("CustomerCollection",CustomerSchema)