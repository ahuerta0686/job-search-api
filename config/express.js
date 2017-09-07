const express    = require('express'),
      bodyParser = require('body-parser'),
      glob       = require('glob'),
      cors       = require('cors');

function bootstrap(app) {
  app.use(bodyParser.json());
  app.use(cors());
  require('../app/responses/success.response.js')(app);
  require('../app/responses/error.response.js')(app);

  // const controllers = glob.sync('/app/controllers/*.controller.js');
  const controllers = [
    '../app/controllers/auth.controller.js',
    '../app/controllers/user.controller.js',
    '../app/controllers/search.controller.js',
    '../app/controllers/snippet.controller.js',
  ];
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

}

module.exports = bootstrap;
