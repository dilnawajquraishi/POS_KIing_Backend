let express=require('express')
let offer=require('../Model/Product_model/offer')

let newoffer=async(req,res)=>{
    let{startDate,endDate,discountPercentage,Do_you_want_to_add_in__the_flash_Sale}=req.body;
    try {
        let create_offer=await offer.create({
            startDate:startDate,
            endDate:endDate,
            discountPercentage:discountPercentage,
            Do_you_want_to_add_in__the_flash_Sale:Do_you_want_to_add_in__the_flash_Sale
        })
        return res.status(200).json({success:true,message:"created offer successfully",create_offer})
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
        
    }
}
module.exports=newoffer