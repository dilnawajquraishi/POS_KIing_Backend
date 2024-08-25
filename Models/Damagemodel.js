// let mongoose=require('mongoose')
// let damageschema=new mongoose.Schema({
//     created_at:
//      { type: Date, 
//         default: Date.now },
//      refrenceno:{
//         type:Number,
//      },
//      image:
//       { type: "String",
//          trim: "true" ,
//          data:"Buffer",
//         },
//         tax:{
//             type:Number,

//         },
//         quantity:{
//             type:Number,

//         },
//         discount:{
//             type:Number,
//         },
    
//         unitcost:{
//             type:Number,
//         },
//         total:{
//             type:Number,
//         },
            
//         textarea:{
//             type:"String",
//         }

// })
// module.exports=mongoose.model('damageproduct',damageschema)



let mongoose = require('mongoose');

let damageschema = new mongoose.Schema({
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    refrenceno: {
        type: Number,
    },
    image: {
        type: String, // Assuming you're storing a URL or base64 encoded string
        trim: true
    },
    tax: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    unitcost: {
        type: Number,
    },
    total: {
        type: Number,
    },
    textarea: {
        type: String,
    },
    search:{
        type:String
    }
});

// module.exports = mongoose.model('damageproduct', damageschema);
module.exports = mongoose.model('damageCollection', damageschema);



