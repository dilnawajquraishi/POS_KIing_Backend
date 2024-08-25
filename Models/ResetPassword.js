const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // Other fields
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Resetpassword', UserSchema);
