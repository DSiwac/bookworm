function secureRoute(req, res, next) {
  if (!req.session.login) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = { secureRoute };
