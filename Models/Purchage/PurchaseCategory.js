let mongoose=require('mongoose')

let PurchageCategory=new mongoose.Schema({
    status:{
        type:String,

    },
    supplier:{
        type:String
    },
})
module.exports=mongoose.model("PurchageCategory",PurchageCategory)