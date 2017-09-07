function errorResponse(statusCode, error) {
}

module.exports = function (app) {
  app.use(function (request, response, next) {
    response.jsonError = function (statusCode, error) {
      let errors = [];

      if (Array.isArray(error)) {
        errors = error;
      } else {
        errors.push(error);
      }

      return response.status(statusCode).json({
        ok: false,
        errors
      });
    }

    next();
  });
};
