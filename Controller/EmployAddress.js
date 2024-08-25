let express=require("express")
let addressemployee=require('../Models/EmployeeAddress')
// --------------------AddAddress-----------------
let createdaddressDetails=async(req,res)=>{
    let {name,email,phoneNumber,city,country,state,zipCode,street}=req.body;
    try {
        let _id=req.params._id;
    
        let findemploy=await addressemployee.findOne({_id:_id})
if(findemploy){
 
}
let addaddress=await addressemployee.create({
    name:name,
    email:email,
  city:city,
  phoneNumber:phoneNumber,
  zipCode:zipCode,
  street:street,
  state:state,
  country:country  
})        
       
        // }
     
        return res.status(200).json({success:true,message:"add address successfully",addaddress})
    } catch (error) {
        return res.status(200).json({success:false,error:error.message})
        
    }
}



// --------------------FindAllAddress------------------
let employAllAddress=async(req,res)=>{
    try {
        let findall=await addressemployee.find()
        return res.status(200).json({success:true,message:"get all address",findall})
    } catch (error) {
        return res.status(400).json({success:false,error:error.message})
        
    }
}



module.exports={
    createdaddressDetails,
    employAllAddress
}