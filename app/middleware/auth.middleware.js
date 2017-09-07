const authConfig = require('../../config/auth.js'),
      jwt        = require('jsonwebtoken');

module.exports = function (request, response, next) {
  const token = request.query.token;
  jwt.verify(token, authConfig.jwtSecret, function (error, decoded) {
    if (error) {
      return response.jsonError(401, 'Invalid or missing token');
    }

    request.user = decoded._doc;
    next();
  });
}
