let mongoose=require('mongoose')
let purchageschema=new mongoose.Schema({
    created_at:
     { type: Date, 
        default: Date.now },
        refrenceno:{
        type:Number,
     },
 name:{
    type:"String",
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
            // enum: {values: ['pending', 'order','receive'], message: 'Status is required.'},
            trim: true
          },
    
        textarea:{
            type:"String",
        },
        PurchageCategory: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'PurchageCategory'
     }

})
module.exports=mongoose.model("purchage",purchageschema)