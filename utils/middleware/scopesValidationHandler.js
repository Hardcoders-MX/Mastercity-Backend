const scopesValidationHandler = (allowScopes) => (req, res, next) => {
  if (!req.user || (req.user && !req.user.scopes)) throw new Error('error in scopes');

  const hasAccess = allowScopes
    .map((allowScope) => req.user.scopes.includes(allowScope))
    .find((allowed) => Boolean(allowed));

  if (hasAccess) next();
  else throw new Error('Insufficient scoopes');
};

module.exports = scopesValidationHandler;
