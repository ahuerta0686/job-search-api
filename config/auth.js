const env = process.env.NODE_ENV || 'development';

const auth = {
  development: {
    saltRounds: 10,
    jwtSecret: 'secret',
  },
  production: {
    saltRounds: 10,
    jwtSecret: 'supersecret',
  }
};

module.exports = auth[env];
