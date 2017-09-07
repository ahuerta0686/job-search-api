const env = process.env.NODE_ENV || 'development';

const indeed = {
  development: {
    url: 'http://api.indeed.com/ads/apisearch',
    protocol: 'http',
    apiPrefix: '/ads/apisearch',
    query: {
      publisher: null,
      v: 2,
      format: 'json',
      chnl: 'FJR',
      start: 0,
      limit: 5,
      highlight: 0
    },
  },
  production: {
    url: 'http://api.indeed.com/ads/apisearch',
    protocol: 'http',
    apiPrefix: '/ads/apisearch',
    query: {
      publisher: null,
      v: 2,
      format: 'json',
      chnl: 'FJR',
      start: 0,
      limit: 5,
      highlight: 0
    },
  }
};

module.exports = indeed[env];
