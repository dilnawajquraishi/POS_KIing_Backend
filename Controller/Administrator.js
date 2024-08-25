let express=require("express")
let administratorModel=require('../Models/Administrator')
let bcryptjs=require('bcryptjs')

// ---------------------Add-Employee------------------




const newadministrator = async (req, res) => {
    let { name, password, confirmPassword, email, phoneNumber, status } = req.body;

    try {
        // Ensure password and confirmPassword are strings
        password = String(password);
        confirmPassword = String(confirmPassword);

        // Check if the user already exists
        let existingUser = await administratorModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, msg: "User already exists!" });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, msg: "Passwords do not match" });
        }

        // Hash the password
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);

        // Create the new user
        let newUser = await administratorModel.create({
            name: name,
            email: email,
            confirmPassword:confirmPassword,
            password: hashPassword, // Store the hashed password
            status: status,
            phoneNumber: phoneNumber,
        });

        return res.status(201).json({ success: true, msg: "User created successfully", details: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Error in creating user", error: error.message });
    }
}




// --------------------Get-All-Employees----------------------

let  getAlladministrator=async(req,res)=>{
// let _id=req.params._id;
try {
let getAllAdministrator=await  administratorModel.find()
    return res.status(200).json({success:true,message:"get all exployees",getAllAdministrator})
} catch (error) {
    return res.status(200).json({success:false,error:error.message})
    
}
}


let  deleteAdministrator=async(req,res)=>{
    let _id=req.params._id;
    try {
        let findEmployees=await administratorModel.findByIdAndDelete({_id:_id})
        if(findEmployees){
            return res.status(200).json({success:true,message:"Employees deleted successfully",findEmployees})
        }
    } catch (error) {
        return res.status(400).json({success:"false",error:error.message})
    }
}


// ------------------Update-Administrator--------------------------

let updateAdministrator=async(req,res)=>{
    let _id=req.params._id;
    let {name,email,password,confirmPassword,phoneNumber,status}=req.body;
    try {
        let findCustomer=await administratorModel.findByIdAndUpdate({_id:_id})
        if(findCustomer){
    let updateCustomer= await administratorModel.updateOne({_id:_id}, { $set:{email: email,password:password,confirmPassword:confirmPassword,phoneNumber:phoneNumber,name:name,status:status}})

            return res.send.json({success:true,message:"Employees updated successfully",updateCustomer})
        }
    } catch (error) {
        return res.status(400).json({success:"false",error:error.message})
    }
}

// ----------------------------Filter------------------------------
// let filterAdministrator=async(req,res)=>{
//     // let id=req.params.key;
//     let data= await administratorModel.find({
//         "$or":[
//             {name:{$regex:req.params.key}},
//             {email:{$regex:req.params.key}},
//             {phoneNumber:{$regex:req.params.key}},
//             {status:{$regex:req.params.key}}

//         ]
//     })
//     res.send(data)
// }














let filterAdministrator = async (req, res) => {
    // Destructure fields from the request query params
    const { name, email, phoneNumber } = req.query;

    // Build the query object dynamically
    let query = {};

    if (name) {
        query.name = { $regex: name, $options: 'i' }; // 'i' for case-insensitive search
    }
    if (email) {
        query.email = { $regex: email, $options: 'i' };
    }
    if (phoneNumber) {
        query.phoneNumber = { $regex: phoneNumber, $options: 'i' };
    }

    try {
        // Execute the query
        let data = await administratorModel.find(query);
        res.json(data); // Use res.json for proper JSON response
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// ------------------------------------------------Administrators-View-------------------------------

let viewAdministrator =  async (req, res) => {
    let id = req.params.id
    let data = await administratorModel.find({ _id: id })
    res.json(data)
}

module.exports={
    newadministrator,
    getAlladministrator,
    updateAdministrator,
    deleteAdministrator,
filterAdministrator,
viewAdministrator

}
