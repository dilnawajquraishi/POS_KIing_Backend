// ProductController.js
const { Gender, Category, SubCategory, Product } = require('../Models/product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('sub_category')
      .exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('sub_category')
      .exec();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  let {name}=req.body
  try {
    // const product = await Product.findByIdAndDelete(req.params.id);
    const product = await Product.deleteOne(name);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.pagination=async(req,res)=>{
try {
  const page=parseInt(req.query.page)|| 1;
  const limit=10;
  const totaluser=await Product.countDocuments();
  const totalpages=Math.ceil(totaluser/limit);
  const nexrpage=page<totalpages ? page +1:null;
   const users=await  Product.find().skip((page-1)*limit).limit(limit);
} catch (error) {
  return res.status(200).json({success:true,message:"Users data",date:users,
    page,
    nextpage,
    totalpages,
    totaluser
  })
}
}



exports.filter=async(req,res)=>{
  const {query}=req.query
  try {
      const filterdata=await Product.find({
          '$or':[
              {
               brand:new RegExp(query,'i','g')   
              },{
                  CategoryName:new RegExp(query,'i','g')  
              }
          ]
      })
      res.json({
          data:filterdata,

      })
  } catch (error) {
      return res.status(400).json({success:false,error:error})
  }
}


// // *********************multer****************


const multer = require('multer');


// // Multer setup
exports.upload = multer({
  dest: './uploads/',
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Only PNG, JPG, and JPEG files are allowed!'));
    }
    cb(undefined, true);
  }
});

// Mongoose schema
// / const imageSchema = new mongoose.Schema({
//    imageData: Buffer
//  });

// //  Mongoose model
//  const Image = mongoose.model('Image', imageSchema);

//  Route to upload image
//  app.post('/upload', upload.single('image'),
 exports.multer=async (req, res) => {
  try {
     // Encode image to Base64
   const encodedImage = req.file.buffer.toString('base64');     // Create new image document
     const image = new Image({
       imageData: encodedImage
     });
     // Save image to database
     await image.save();
   res.send('Image uploaded successfully!');
   } catch (error) {
    res.status(400).send('Error uploading image!');
   }
};

