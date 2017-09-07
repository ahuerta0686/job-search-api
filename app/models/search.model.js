const mongoose = require('mongoose'),
      ObjectId = mongoose.Schema.Types.ObjectId;

const schema = mongoose.Schema({
  query: { type: String },
  zip: { type: Number },
  ip: { type: String },
  searchedAt: { type: Date },
});

module.exports = mongoose.model('Search', schema);
