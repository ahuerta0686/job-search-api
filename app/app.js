const express  = require('express'),
      glob     = require('glob'),
      http     = require('http'),
      mongoose = require('mongoose'),
      config   = require('../config/config.js'),
      indeed   = require('../config/indeed.js');

if (!indeed.query.publisher) {
  throw new Error('Indeed publisher key not provided, see config/indeed.js');
}

mongoose.connect(config.db);
mongoose.Promise = global.Promise;

const models = [
  './models/user.model.js',
  './models/search.model.js',
  './models/snippet.model.js',
];
models.forEach(function (model) {
  require(model);
});

const app    = express(),
      server = http.createServer(app);

require('../config/express.js')(app);

server.listen(config.port, function () {
  console.log(`Check me out on port ${config.port}`);
});
