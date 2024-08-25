let express = require('express');
let purchagemodel = require('../Models/Purchage/Purchagemodel');
const PurchageCategory = require('../Models/Purchage/PurchaseCategory');
const { FindAllAddress } = require('./EmployeeAddressCategory');

let purchage = async (req, res) => {
    console.log('_______________________________________________ invoked')
    let { created_at, name, image, supplier, status, textarea, refrenceno,  PurchageCategory } = req.body;
    console.log(status);
    try {
        let newpurchage = await purchagemodel.create({
            created_at: created_at,
            name: name,
            image: image,
            supplier: supplier,
            status: status,
            textarea:textarea,
            refrenceno: refrenceno,
            PurchageCategory:  PurchageCategory
            // search:seach
        });
        return res.status(200).json({ success: true, message: "Purchase created successfully", newpurchage });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}


let delete_purchage_product = async (req, res) => {
    try {
        let result = await purchagemodel.findByIdAndDelete(req.params._id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "purchase product deleted successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// let purchageGetdata = async (req, res) => {
//     try {
//         let data = await purchagemodel.find();
//         return res.status(200).json({ success: true, message: "Data retrieved successfully", data });
//     } catch (error) {
//         return res.status(400).json({ success: false, error: error.message });
//     }
// };

// controllers/purchageController.js

// const Purchage = require('../models/purchage'); // Adjust the path as needed

// let getAllPurchages = (req, res) => {
//     purchagemodel.find()
//         .populate('PurchageCategory') // This will populate the PurchageCategory field with category details
//         .exec((err, purchages) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'An error occurred' });
//             }
//             res.json(purchages);
//         });
// };

let getAllPurchages=async(req,res)=>{
    try {
        let findgetdata=await  purchagemodel.find({})
        return res.status(200).json({success:true,message:"get all data",findgetdata})
    } catch (error) {
        return res.status(500).json({success:false,error:error.message})
        
    }
}



let purchage_update = async (req, res) => {
    let { date,refrenceno,status,image,supplier } = req.body;
    let _id = req.params._id;
    try {
        let updatedamage = await purchagemodel.findByIdAndUpdate(
            _id,
            { $set: { date, refrenceno, status, image,supplier } },
            { new: true }
        );

        return res.status(200).json({ success: true, message: "purhcage product updated successfully", updatedamage });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
     purchage,
     delete_purchage_product ,
     getAllPurchages,
     purchage_update
     };
