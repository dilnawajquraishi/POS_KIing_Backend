const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Gender Schema
const GenderSchema = new Schema({ name: { type: "String", required: true, unique: true, trim: true } });
const Gender = mongoose.model('Gender', GenderSchema);

// Category Schema
// const CategorySchema = new Schema({ 
//   name: { type: String, required: true, trim: true }, 
//   gender: { type: Schema.Types.ObjectId, ref: 'Gender', required: true } 
// });
const CategorySchema = new Schema({ 
  name: { type: String, required: true, trim: true }, 
  gender: { type: Schema.Types.ObjectId, ref: 'Gender'} 
});
const Category = mongoose.model('Category', CategorySchema);

// SubCategory Schema
// const SubCategorySchema = new Schema({ 
//   name: { type: String, required: true, trim: true }, 
//   category: { type: Schema.Types.ObjectId, ref: 'Category', required: true } 
// });

const SubCategorySchema = new Schema({ 
  name: { type: String, required: true, trim: true }, 
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true } 
});
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

// Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  // price: { type: Number, required: true, min: 0 },
  barcode: {
    type: String,
    required: true,
    unique: true
},
tax: {
    type: Number,
    required: true
},
status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
},
unit: {
    type: String,
    required: true
},
can_purchasable: {
  type: String,
  enum: ['yes', 'no'],
  default: 'yes'
},
show_stock_out: {
  type: String,
  enum: ['enable', 'disable'],
  default: 'enable'
},
buying_price: {
  type: Number,
  required: true
},
selling_price: {
  type: Number,
  required: true
},
  sku: { type: Number,   trim: true },
  stock_quantity: { type: Number, required: true, default: 0, min: 0 },
  // sub_category: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  image_url: { type: String, trim: true ,data:Buffer},
  sellingprice:{
type:Number,
  },
  
  Refundable:{
    type:Number,
  },

  brand: { type: String, trim: true },
  color: { type: String, trim: true },
  size: { type: String, trim: true },
  material: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  maximum_purchage_quantity:{
    type:Number,

  },
  low_stock_quantity_warning:{
    type:Number,
  },
  tag:{ 
    type:"String",
  },
  textarea:{
    type:"String",
  },
  weight:{
    type:Number,
  }
});

ProductSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});


// *************************************Pagination********************************
// let page=async(req,res)=>{
//   try {
//     const page=parseInt(req.query.page)||1
//     const limit=10;
//     const next
//   } catch (error) {
    
//   }
// }
const Product = mongoose.model('Product', ProductSchema);


module.exports = { Gender, Category, SubCategory, Product };
