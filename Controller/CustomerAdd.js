let express=require("express")
let bcryptjs=require('bcryptjs')

let customerModel=require('../Models/AddCustomer')

// ---------------------Add-Employee------------------


const newCustomer = async (req, res) => {
    let {name,password,confirmPassword,email,status,phoneNumber}=req.body;


    try {
        let exployeesfind = await customerModel.findOne({ email: email })

        if (!exployeesfind) {
                     // Check if password and confirmPassword match
                     if (password !== confirmPassword) {
                        return res.status(400).json({ success: false, msg: "Passwords do not match" });
                    }
            const salt = bcryptjs.genSaltSync(10);
            const hashPassword = bcryptjs.hashSync(password, salt);
            // console.log(hashPassword)

            let details = await customerModel.create({
                name: name,
                email: email,
                password: hashPassword,
                confirmPassword:hashPassword,
                phoneNumber:phoneNumber,
                status:status
            })
            return res.status(200).json({ success: true, msg: "user created successfully", details })

        }
        else {
            return res.status(200).json({ success: false, msg: "user already exists!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "error in creating user", error: error.message })
    }


}


// --------------------Get-All-Employees----------------------

let getAllCustomer=async(req,res)=>{
// let _id=req.params._id;
try {
let getallCustomer=await  customerModel.find()
    return res.status(200).json({success:true,message:"get all exployees",getallCustomer})
} catch (error) {
    return res.status(200).json({success:false,error:error.message})
    
}
}



// ------------------Delete-Customer--------------------------

let deleteEmployees=async(req,res)=>{
    let _id=req.params._id;
    try {
        let findEmployees=await customerModel.findByIdAndDelete({_id:_id})
        if(findEmployees){
            return res.status(200).json({success:true,message:"Employees deleted successfully",findEmployees})
        }
    } catch (error) {
        return res.status(400).json({success:"false",error:error.message})
    }
}


// ------------------Update-Customer--------------------------

let updateEmployees=async(req,res)=>{
    let _id=req.params._id;
    let {name,email,password,confirmPassword,phoneNumber,address,status}=req.body;
    try {
        let findCustomer=await customerModel.findByIdAndUpdate({_id:_id})
        if(findCustomer){
    let updateCustomer= await employeesmodel.updateOne({_id:_id}, { $set:{email: email,password:password,confirmPassword:confirmPassword,address:address,phoneNumber:phoneNumber,name:name,status:status}})

            return res.status(200).json({success:true,message:"Employees updated successfully",updateCustomer})
        }
    } catch (error) {
        return res.status(400).json({success:"false",error:error.message})
    }
}


// ------------------------------Customer-Filter-------------------------------------------
let CustomerFilter=async(req,res)=>{
    let {name,email,phoneNumber}=req.body;
    let query={};
    if(name){
        query.name = { $regex: name, $options: 'i' }; // 'i' for case-insensitive search

    }
    if(email){
        query.email={$regex:email,$option:"i"};
    }
    if(phoneNumber){
        query.phoneNumber={$regex:phoneNumber,$option:"i"};
    }
    try {
        let findquery=await customerModel.find(query);
        res.send(findquery)
    } catch (error) {
        res.status(500).send(err.message);
        
    }
}

// --------------------------------Customer-View---------------------------

let viewCustomer =  async (req, res) => {
    let id = req.params.id
    let data = await customerModel.find({ _id: id })
    res.json(data)
}

module.exports={
    newCustomer,
    getAllCustomer,
    deleteEmployees,
    updateEmployees,
 CustomerFilter,
 viewCustomer

}