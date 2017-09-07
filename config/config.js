const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: 'mongodb://localhost:27017/jobsearch',
    port: 3000,
  },
  production: {
    db: 'mongodb://jobsearch:jobsearch@ds127492.mlab.com:27492/jobsearch',
    port: 7001,
  }
}

module.exports = config[env];
