const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    NODE_ENV : process.env.NODE_ENV,
    PORT : process.env.PORT,
    DB_USERNAME : process.env.DB_USERNAME,
    PASSWORD : process.env.PASSWORD,
    DATABASE : process.env.DATABASE,
    HOST : process.env.HOST,
    DIALECT : process.env.DIALECT,
    DB_USERNAME_PROD : process.env.DB_USERNAME_PROD,
    PASSWORD_PROD : process.env.PASSWORD_PROD,
    DATABASE_PROD : process.env.DATABASE_PROD,
    HOST_PROD : process.env.HOST_PROD,
    DIALECT_PROD : process.env.DIALECT_PROD,
    USER_AUTH : process.env.USER_AUTH,
    USER_PASSWORD : process.env.USER_PASSWORD,
}