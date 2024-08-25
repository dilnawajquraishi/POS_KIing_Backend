// let express=require('express')

// let damageproduct=require('../Models/Damagemodel');
// const uploadfile = require('../uploads/Cloudinary');
// let damage_create_product=async(req,res)=>{
//     let  {image,tax,quantity,refrenceno,unitcost,textarea,discount}=req.body;
//     const data_image=await uploadfile(image)
//     console.log(data_image)
//     try {
//         let danagecreate=await damageproduct.create({
//             image:image,
//             tax:tax,
//             quantity:quantity,
//             refrenceno:refrenceno,
//             unitcost:unitcost,
//             textarea:textarea,
//             discount:discount
//         })
//         return res.status(200).json({success:true,message:"damage product created successfully",danagecreate})
//     } catch (error) {
//         return res.status(200).json({success:false,error:error.message})
        
//     }
// }


// // ********************update-damage*********************

// let damage_update=async(req,res)=>{
//     let {tax,discount,unitcost,quantity } = req.body

// let _id=req.params._id;
// try {
//     let finddamage_product=await damageproduct.findByIdAndUpdate({_id:_id})
//     if(finddamage_product){
   
//         let updatedamage = await damage.updateOne({_id:_id }, { $set: {tax:tax, unitcost: unitcost,discount:discount }})

//     }
//     return res.status(200).json({success:true,message:"Damage product updated successfully",updatedamage})

// } catch (error) {
//     return res.status(200).json({success:true,error:error.message})
// }
// }

// // *************************delete_damage_product*******************
// let delete_damage_product=async(req,res)=>{
//     let _id=req.params._id;
//     try {
//         let find_damage_product=await damageproduct.findOne({_id:_id})
//         if(find_damage_product){
//             let deletedamage=await damageproduct.deleteOne()

//         }
//         return res.status(200).json({success:"true",message:"damage product deleted successfully"})
//     } catch (error) {
//         return res.status(400).json({success:"false",error:error.message})
        
//     }
// }

// // ************Damage_get_all_data*******************
// // let damage_all_data=async(req,res)=>{
    
// //     try {
// //     let finddata=await   damageproduct.find({})
    
// //         return res.status(200).json({success:true,message:"get data successfully",finddata})
      
// //     } catch (error) {
// //        return res.status(400).json({success:false,error:error.message}) 
// //     }
// // }

// let damageGetdata = async (req, res) => {
//     let data = await damageproduct.find({})
//     res.json(data)
// }







// module.exports={
//     damage_create_product,
//     damage_update,
//     delete_damage_product,
//     damageGetdata
// }



let express = require('express');
let damageproduct = require('../Models/Damagemodel');
const uploadfile = require('../uploads/Cloudinary');
let damage_create_product = async (req, res) => {
    console.log(req)
    let { image, tax, quantity,total, unitcost, textarea, discount ,refrenceno,created_at} = req.body;
    try {
        // Upload the image to Cloudinary
        const data_image = await uploadfile(image);

        // Create the damage product in the database
        let damageCreate = await damageproduct.create({
            image: data_image.secure_url, // Save only the URL
            tax: tax,
            quantity: quantity,
            refrenceno: refrenceno,
            unitcost: unitcost,
            textarea: textarea,
            discount: discount,
            total:total,
            created_at:created_at
        });

        return res.status(200).json({ success: true, message: "Damage product created successfully", damageCreate });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}


let damage_update = async (req, res) => {
    let { tax, discount, unitcost, quantity } = req.body;
    let _id = req.params._id;
    try {
        let updatedamage = await damageproduct.findByIdAndUpdate(
            _id,
            { $set: { tax, unitcost, discount, quantity } },
            { new: true }
        );

        return res.status(200).json({ success: true, message: "Damage product updated successfully", updatedamage });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// let delete_damage_product = async (req, res) => {
//     let _id = req.params._id;
//     try {
//         // let deletedamage = await damageproduct.findByIdAndDelete({_id: _id });
//         return res.status(200).json({ success: true, message: "Damage product deleted successfully" });
//     } catch (error) {
//         return res.status(400).json({ success: false, error: error.message });
//     }
// };

//  ---------------cg---------------
let delete_damage_product = async (req, res) => {
    let _id = req.params._id; // Ensure this is how you're passing the ID
    try {
        // Ensure the _id is a valid format if required by your database
        let deletedamage = await damageproduct.findByIdAndDelete(_id);

        if (!deletedamage) {
            return res.status(404).json({ success: false, message: "Damage product not found" });
        }

        return res.status(200).json({ success: true, message: "Damage product deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};




let damageGetdata = async (req, res) => {
    try {
        let data = await damageproduct.find({});
        return res.status(200).json({ success: true, message: "Data retrieved successfully", data });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    damage_create_product,
    damage_update,
    delete_damage_product,
    damageGetdata
};
