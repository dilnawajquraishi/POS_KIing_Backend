let express=require("express")
let employeesmodel=require('../Models/AddEmployees')
let bcryptjs=require('bcryptjs');
const { filter } = require("./ProductControllers");

// ---------------------Add-Employee------------------


const newemployess = async (req, res) => {
    let {name,password,confirmPassword,email,role,phoneNumber,status}=req.body;


    try {
        let exployeesfind = await employeesmodel.findOne({ email: email })

        if (!exployeesfind) {
                     // Check if password and confirmPassword match
                     if (password !== confirmPassword) {
                        return res.status(400).json({ success: false, msg: "Passwords do not match" });
                    }
            const salt = bcryptjs.genSaltSync(10);
            const hashPassword = bcryptjs.hashSync(password, salt);
            // console.log(hashPassword)

            let details = await employeesmodel.create({
                name: name,
                email: email,
                password: hashPassword,
                confirmPassword:hashPassword,
                // address:address,
                phoneNumber:phoneNumber,
                role:role,
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

let getAllEmployees=async(req,res)=>{
// let _id=req.params._id;
try {
let getallEmploy=await  employeesmodel.find()
    return res.status(200).json({success:true,message:"get all exployees",getallEmploy})
} catch (error) {
    return res.status(200).json({success:false,error:error.message})
    
}
}




// ------------------Delete-Employees--------------------------

let deleteEmployees=async(req,res)=>{
    let _id=req.params._id;
    try {
        let findEmployees=await employeesmodel.findByIdAndDelete({_id:_id})
        if(findEmployees){
            return res.status(200).json({success:true,message:"Employees deleted successfully",findEmployees})
        }
    } catch (error) {
        return res.status(400).json({success:"false",error:error.message})
    }
}


// ------------------Update-Employees--------------------------

let updateEmployees=async(req,res)=>{
    let _id=req.params._id;
    let {name,email,password,confirmPassword,phoneNumber,address,status}=req.body;
    try {
        let findEmployees=await employeesmodel.findByIdAndUpdate({_id:_id})
        if(findEmployees){
    let updateEmploy = await employeesmodel.updateOne({_id:_id}, { $set:{email: email,password:password,confirmPassword:confirmPassword,address:address,phoneNumber:phoneNumber,name:name,status:status } })

            return res.status(200).json({success:true,message:"Employees updated successfully",findEmployees})
        }
    } catch (error) {
        return res.status(400).json({success:"false",error:error.message})
    }
}



// ------------------------------filter-Employee-------------------------
let filterEmployee=async(req,res)=>{
    let {name,email,phoneNumber,role}=req.body;
    let query={};
    if(name){
query.name={$regex:name,$option:"i"}
// query.name = { $regex: name, $options: 'i' }; // 'i' for case-insensitive search

    }
    if(email){
        query.email={$regex:email,$option:"i"}
    }
    if(phoneNumber){{
        query.phoneNumber={$regex:phoneNumber,$option:"i"}
    }}
    if(role){
        query.role={$regex:role,$option:"i"}
    }
    try {
        let data=await employeesmodel.find()
        res.send(data)
    } catch (error) {
        res.status(500).send(error.message);

    }

}

// -------------------viewEmployees---------------------------

let viewEmployees =  async (req, res) => {
    let id = req.params.id
    let data = await customerModel.find({ _id: id })
    res.json(data)
}

module.exports={
    newemployess,
    getAllEmployees,
    deleteEmployees,
    updateEmployees,
    filterEmployee,
    viewEmployees
}