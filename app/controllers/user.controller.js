const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      User = mongoose.model('User'),
      bcrypt = require('bcrypt'),
      authConfig = require('../../config/auth');

/*
 * Method:   POST
 * Endpoint: /api/users/create
 * Body:     STRING email
 *           STRING password
 */
router.post('/create', create);
function create(request, response) {
  const body = request.body;
  bcrypt.hash(body.password, authConfig.saltRounds)
    .then(function (hash) {
      let user = new User({
        email: body.email,
        password: hash,
      });

      return user.save();
    })
    .then(function () {
      return response.json({message: 'Success'});
    })
    .catch(function (error) {
      console.log(error);
    });
}

function init(app) {
  app.use('/api/users', router);
}

module.exports = init;
