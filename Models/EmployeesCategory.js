let express=require('express')
const { default: mongoose } = require('mongoose')
let addresdcategory=new mongoose.Schema({

    
     country:{
        type:"String",

    },

})
module.exports=mongoose.model("addressCategory",addresdcategory)