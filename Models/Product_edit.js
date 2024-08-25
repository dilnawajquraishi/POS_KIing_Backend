const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Gender Schema
const clothSchema = new Schema({ name: { type: "String", required: true, unique: true, trim: true } });
const cloth = mongoose.model('cloth', clothSchema);

// Category Schema
const CategorySchema = new Schema({ 
  name: { type: String, required: true, trim: true }, 
  cloth: { type: Schema.Types.ObjectId, ref: 'cloth', required: true } 
});
const Category = mongoose.model('Category', CategorySchema);

// SubCategory Schema
const SubCategorySchema = new Schema({ 
  name: { type: String, required: true, trim: true }, 
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true } 
});
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);

// Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
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
  sku: { type: String, required: true, unique: true, trim: true },
  sub_category: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  sellingprice:{
type:Number,
  },
  Refundable:{
    type:Number,
  },

  brand: { type: String, trim: true },
 
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


module.exports = { cloth, Category, SubCategory, Product };
