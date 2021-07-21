const config = require('../config/index');
module.exports =  {
    "development": {
      "username": config.DB_USERNAME,
      "password": config.PASSWORD,
      "database": config.DATABASE,
      "host": config.HOST,
      "dialect": config.DIALECT
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
        "username": config.DB_USERNAME_PROD,
        "password": config.PASSWORD_PROD,
        "database": config.DATABASE_PROD,
        "host": config.HOST_PROD,
        "dialect": config.DIALECT_PROD
    }
  }
  