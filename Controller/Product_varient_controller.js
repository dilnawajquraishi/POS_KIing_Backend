let express=require("express")
let product_varient_model=require("../Models/Product_model/Product_varient");

let varient_product=async(req,res)=>{
    let {price,sku}=req.body;
    try {
        let newvarient=await product_varient_model.create ({
price:price,
sku:sku
        })
        return res.status(200).json({success:true,message:"varient created successfully",newvarient})
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
        
    }
}
module.exports=varient_product
