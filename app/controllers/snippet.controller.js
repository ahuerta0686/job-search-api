const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Snippet = mongoose.model('Snippet'),
      authMiddleware = require('../middleware/auth.middleware.js');

/*
 * Method:   GET
 * Endpoint: /api/snippet
 */
router.get('/', index);
function index(request, response) {
  Snippet.find({}).exec()
    .then(function (snippets) {
      return response.jsonSuccess(200, snippets);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*
 * Method:   POST
 * Endpoint: /api/snippet/create
 */
router.post('/create', authMiddleware, create);
function create(request, response) {
  const body = request.body;
  const snippet = new Snippet({ html: body.html });
  Snippet.remove({})
    .then(function () {
      return snippet.save();
    })
    .then(function () {
      return response.jsonSuccess(200, snippet);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function init(app) {
  app.use('/api/snippets', router);
}

module.exports = init;
