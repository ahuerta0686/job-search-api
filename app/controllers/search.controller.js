const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Search = mongoose.model('Search'),
      rp = require('request-promise-native'),
      indeedConfig = require('../../config/indeed.js'),
      authMiddleware = require('../middleware/auth.middleware.js');

/*
 *
 */
router.get('/', authMiddleware, index);
function index(request, response) {
  const limit = 10;
  const skip = ((Number(request.query.page) || 1) - 1) * limit;
  const sortBy = request.query.sort || '-searchedAt';

  let searches;
  Search.find({}).sort(sortBy).skip(skip).limit(limit).exec()
    .then(function (_searches) {
      searches = _searches;
      return Search.find({}).count();
      // return response.jsonSuccess(200, searches);
    })
    .then(function (count) {
      const pages = Math.ceil(count / limit);
      return response.jsonSuccess(200, searches, { pages });
    })
    .catch(function (error) {
      console.log(error);
    });
}

/*
 *
 */
router.post('/create', create);
function create(request, response) {
  const body = request.body;
  let search = new Search({
    query: body.query,
    zip: body.zip,
    ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
    searchedAt: new Date(),
  });

  const limit = 10;
  const skip = ((Number(request.query.page) || 1) - 1) * limit;

  let indeedQueryObj = indeedConfig.query;
  indeedQueryObj.q = search.query;
  indeedQueryObj.l = search.zip;
  indeedQueryObj.userip = search.ip;
  indeedQueryObj.useragent = request.headers['user-agent'];
  indeedQueryObj.start = skip;
  indeedQueryObj.limit = limit;

  let indeedResponse;
  rp({
    uri: indeedConfig.url,
    qs: indeedQueryObj
  })
    .then(function (data) {
      indeedResponse = JSON.parse(data);
      return search.save();
  })
    .then(function () {
      return response.jsonSuccess(200, search, {
        results: indeedResponse.results,
        pages: indeedResponse.totalResults / limit
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function init(app) {
  app.use('/api/searches', router);
}

module.exports = init;
