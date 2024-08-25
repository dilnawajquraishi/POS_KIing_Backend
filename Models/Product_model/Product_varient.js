let mongoose=require('mongoose')
let product_varient=new mongoose.Schema({
    price:{
        type:Number,
      
    },
    sku:{
        type:Number,
    }
})
module.exports=mongoose.model('varient_product',product_varient)