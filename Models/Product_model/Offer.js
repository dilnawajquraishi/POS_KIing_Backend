const mongoose = require('mongoose');

// Define the schema
const offerSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  Do_you_want_to_add_in__the_flash_Sale: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Compile the model from the schema
module.exports= mongoose.model('offercollection', offerSchema);


