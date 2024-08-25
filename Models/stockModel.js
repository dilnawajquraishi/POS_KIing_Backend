let mongoose=require('mongoose')
let stockModel=new mongoose.Schema({
    created_at:
     { type: Date, 
        default: Date.now },
        refrenceno:{
        type:Number,
     },

 supplier:{
    type:"String",
 },
     image:
      { type: "String",
         trim: "true" ,
         data:"Buffer",
        },
   
        status: {
            type: String,
            enum: ['pending', 'order',"receive"],
            default: ''
        },
    
        search:{
            type:"String",
        }

})
module.exports=mongoose.model("Stock_collection",stockModel)