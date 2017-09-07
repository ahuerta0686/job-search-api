module.exports = function (app) {
  app.use(function (request, response, next) {
    response.jsonSuccess = function (statusCode, data, meta) {
      return  response.status(statusCode).json({
          ok: true,
          data,
          meta
        });
    }

    next();
  });
};
