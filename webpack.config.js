switch (process.env.NODE_ENV){
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;
}
