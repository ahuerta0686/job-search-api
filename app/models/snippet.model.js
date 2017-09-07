const mongoose = require('mongoose');

const schema = mongoose.Schema({
  html: { type: String },
});

module.exports = mongoose.model('Snippet', schema);
