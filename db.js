// let mongoose=require('mongoose')
// // require('dotenv').config()

// let connection=async()=>{

//   await   mongoose.connect('mongodb://0.0.0.0:27017/database')    //  mongoose.connect(process.env)
//   // await mongoose.connect(process.env.MONGO_URI)

//     .then(()=>console.log('connect to mongdb'))
//     .catch(()=>console.log('error in connecting mongodb'))
// }
// module.exports=connection;



const mongoose = require('mongoose');
require('dotenv').config()

const connectToDb = async()=>{
   await mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to mongodb successfully!'))
  .catch(()=>console.log("error in connecting mongodb"))
  console.log(process.env.MONGO_URI)
}

module.exports = connectToDb;

