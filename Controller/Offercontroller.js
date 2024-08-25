let offer=require('../Models/Product_model/Offer')
let newoffer=async(req,res)=>{
    let {startDate,enddate,discountPercentage,Do_you_want_to_add_in__the_flash_Sale}=req.body;
    try {
        let createoffer=await offer.create({
            startDate:startDate,
            enddate:enddate,
            discountPercentage:discountPercentage,
            Do_you_want_to_add_in__the_flash_Sale:Do_you_want_to_add_in__the_flash_Sale
        })
        return res.status(200).json({success:true,message:"offer created successfully",createoffer})
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
        
    }
}
module.exports=newoffer