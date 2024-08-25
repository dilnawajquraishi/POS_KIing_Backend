// // let express=require('express')
// const { Product } = require('../Models/product');
// let productmodel=require('../Models/Schema')


// // *********************************************************************Insert Product***********************************************



// let createproduct=async(req,res)=>{
//     try {
//         let {name,description,price,title,rating,clothType,CategoryName,date,image,brand,minimumOrderQuantity,reviewerName,reviewerEmail,stockNumber}=req.body;
//         let createnewproduct=await productmodel.create({
// name:name,price:price,
// title:title,
// rating:rating,
// date:date,
// clothType:clothType,
// image:image,
// description:description,
// brand:brand,
// minimumOrderQuantity:minimumOrder,
// stockNumber:stockNumber,
// CategoryName:CategoryName
//         })
//        return  res.status(200).json({message:"product created successfully",createproduct});
//     } catch (error) {
//         return res.status(500).json({success:false,error:"error.massage"})
//     }
// }

// // ***************************************************Update Product**************************************************************


// let updateproduct=async(req,res)=>{
//     // let _id = req.params._id
//     let {name}=req.body;

//     try {
//     let findproductid = await productmodel.findOne(name )  

//         if(findproductid){
//             let updatedproduct = await productmodel.updateOne({ name}, { $set: { name: name, description: description,title:title,price:price,image:image,brand:brand,description,category,discountPercentage,stockNumber } })
//             return res.status(200).json({ success: true, msg: "user updated successfully", updatedproduct })  
//               }
//     } catch (error) {
//         return res.status(500).json({ success: true, msg: "user updated successfully" })    
//      }
        
//     }



// // *****************************************************************Delete_Product***********************************************************

// let Delete_Product=async(req,res)=>{
//     // let _id = req.params._id
//     let {name}=req.body;
//     try {
//     let findproductid = await productmodel.findOne(name)  
//         if(findproductid){
//             let deleteproduct=await productmodel.deleteOne({
//             })
//             return res.status(200).json({success:true,message:"product deleted successfully "})

//         }
//     } catch (error) {
//         return res.status(500).json({success:false,message:"error.message"})
        
//     }

// }


// //  *******************************************************************find_all_product****************************************************

// let find_all_product=async(req,res)=>{
//     // let _id=req.params._id
//     let {name}=req.body
//     try {
//         let findproductid=await productmodel.findOne({name})
//         if(findproductid){
//         return res.status(200).json({ success: true, msg: "all users", findproductid })

//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, msg: "Get all Product", findproductid })
        
//     }
// }
  

//   addProduct();
// //   Function to add a new product
// async function addProduct() {
//     const gender = await Gender.create({ name: 'Men' });
//     const category = await Category.create({ name: 'Clothing', gender: gender._id });
//     const subCategory = await SubCategory.create({ name: 'Jeans', category: category._id });
  
//     const newProduct = await Product.create({
//       name: "Blue Denim Jeans",
//       description: "Comfortable blue denim jeans for men.",
//       price: 49.99,
//       sku: "JEANS-BLUE-MEN-001",
//       stock_quantity: 100,
//       sub_category: subCategory._id,
//       image_url: "http://example.com/images/jeans.jpg",
//       brand: "Levi's",
//       color: "Blue",
//       size: "L",
//       material: "Denim"
//     });
  
//     console.log("Product added:", newProduct);
//   }

// //  ***************************************************filter-by caategory************************************************
// // let filter=async(req,res)=>{
// //     let data=await productmodel.find({
// //      "$or":[
// //          {brand:{$regex:req.params.key}},
// //          {email:{$regex:req.params.key}}
    
// //      ]
// //     })
// //     res.send(data)
// //  }


// //  const filter=async(req,res)=>{
// //     const {query}=req.query
// //     try {
// //         const filterdata=await Product.find({
// //             '$or':[
// //                 {
// //                  brand:new RegExp(query,'i','g')   
// //                 },{
// //                     CategoryName:new RegExp(query,'i','g')  
// //                 }
// //             ]
// //         })
// //         res.json({
// //             data:filterdata,

// //         })
// //     } catch (error) {
        
// //     }
// //  }


// module.exports={
//     createproduct,
//     updateproduct,
//     Delete_Product,
//     find_all_product,
//     // filter
//     // addProduct
    

// }



