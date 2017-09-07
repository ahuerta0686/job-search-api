const mongoose = require('mongoose'),
      ObjectId = mongoose.Schema.Types.ObjectId;

const schema = mongoose.Schema({
  email: { type: String, lowercase: true },
  password: { type: String }
});

module.exports = mongoose.model('User', schema);
