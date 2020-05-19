const debug = require('debug')('app:scripts:api-keys');
const config = require('../config');
const db = require('../databases/mongodb');

const {
  mongodbUri, user, password, host, name,
} = config.db;

let MONGODB_URI = mongodbUri;

if (config.srv.mode === 'development') {
  MONGODB_URI = `mongodb+srv://${user}:${password}@${host}/${name}?retryWrites=true&w=majority`;
}

db.connect(MONGODB_URI);

const ApiKey = require('../components/auth/modelApiKeys');

const adminScopes = [
  'read:users',
  'update:users',
  'delete:users',
  'approve:properties',
  'create:properties',
  'read:properties',
  'update:properties',
  'delete:properties',
];

const offererScopes = [
  'read:users',
  'update:users',
  'delete:users',
  'create:properties',
  'read:properties',
  'update:properties',
  'delete:properties',
];

const applicantScopes = [
  'read:users',
  'update:users',
  'delete:users',
  'read:properties',
  'create:favorites',
  'delete:favorites',
  'create:favorites-applicant',
  'read:favorites-applicant',
];

const apiKeys = [
  {
    token: config.auth.adminApiKeyToken,
    scopes: adminScopes,
  },
  {
    token: config.auth.offererApiKeyToken,
    scopes: offererScopes,
  },
  {
    token: config.auth.applicantApiKeyToken,
    scopes: applicantScopes,
  },
];

// eslint-disable-next-line consistent-return
const seedApiKeys = async () => {
  try {
    const promises = apiKeys.map(async (apiKey) => {
      await ApiKey.create(apiKey);
    });

    await Promise.all(promises);
    debug(`${promises.length} api keys have been created succesfully`); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(error);
    process.exit(1);
  }
};

seedApiKeys();
