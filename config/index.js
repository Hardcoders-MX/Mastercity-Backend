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
  sentry: {
    sentryDns: process.env.SENTRY_DSN,
    sentryId: process.env.SENTRY_ID,
  },
  auth: {
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
    offererApiKeyToken: process.env.OFFERER_API_KEY_TOKEN,
    applicantApiKeyToken: process.env.APPLICANT_API_KEY_TOKEN,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: Boolean(process.env.EMAIL_SECURE),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

module.exports = config;
