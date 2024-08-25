let express=require('express')
// let stockmodel=require('../Models/stock/stockModel')
let stockmodel=require('../stockModel')
// let stockModel=require('../Model/stock/stockModel')


// ***************Stock_Create***********************

let new_stock_product=async(req,res)=>{
    let  {image,refrenceno,search,supplier,status,}=req.body;
    console.log(data_image)
    try {
        let stock_product=await stockmodel.create({
            image:image,
            refrenceno:refrenceno,
            search:search,
            supplier:supplier,
            status:status,
          
        })
        return res.status(200).json({success:true,message:"stock product created successfully",stock_product})
    } catch (error) {
        return res.status(200).json({success:false,error:error.message})
        
    }
}


// *********************************update_stock_poduct***************************

let updated_stock=async(req,res)=>{
    let {created_at,refrenceno,status,image,search,supplier}=req.body;
    let _id=req.params._id;
    try {
    let update_purchage=await stockmodel.findByIdAndUpdate({_id:_id},{$set:created_at,refrenceno,status,image,search,supplier})
      return res.status(200).json({success:true,msg:"stock Product updated successfully",update_purchage})
        
    } catch (error) {
       return res.status(200).json({success:true,error:error.message})
        
    }
  

}



// **************Stock_Purchage_Product**************
let Stock_Purchage_delete=async(req,res)=>{
    let _id=req.params._id
    try {
        let delete_purchage_product= await stockmodel.findByIdAndDelete({_id:_id})
        return res.status(200).json({success:true,message:"Stock deletd successfully"})
    } catch (error) {
        return res.status(200).json({success:false,error:error.message})
        
    }
}



module.exports={
    Stock_Purchage_delete,
    new_stock_product,
    updated_stock
}
