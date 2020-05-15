require('dotenv').config();

const config = {
  srv: {
    mode: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    logPrefix: process.env.LOG_PREFIX || 'app',
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    mongodbUri: process.env.MONGODB_URI,
  },
  auth: {
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
  },
};

module.exports = config;
