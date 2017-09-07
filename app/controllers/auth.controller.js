const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      User = mongoose.model('User'),
      bcrypt = require('bcrypt'),
      authConfig = require('../../config/auth'),
      authMiddleware = require('../middleware/auth.middleware.js'),
      jwt = require('jsonwebtoken');

/*
 * Method:   GET
 * Endpoint: /api/auth/token
 * Query:    STRING token
 */
router.get('/token', authMiddleware, getToken);
function getToken(request, response) {
  return response.jsonSuccess(200, request.user);
}

/*
 * Method:   POST
 * Endpoint: /api/auth/token
 * Body:     STRING email
 *           STRING password
 */
router.post('/token', postToken);
function postToken(request, response) {
  const body = request.body;
  let user;
  User.findOne({email: body.email}).exec()
    .then(function (_user) {
      if (!_user) {
        response.jsonError(404, 'User not found');
        throw new Error();
      }

      user = _user;
      return bcrypt.compare(body.password, user.password);
    })
    .then(function (valid) {
      if (!valid) {
        return response.jsonError(403, 'Password is incorrect');
      }

      user.password = null;

      let token = jwt.sign(user, authConfig.jwtSecret, {
        expiresIn: '1h',
      });

      return response.jsonSuccess(200, { token });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function init(app) {
  app.use('/api/auth', router);
}

module.exports = init;
