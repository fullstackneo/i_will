function withAuth (...roles) {
  return (req, res, next) => {
    // must login
    if (!req.session.loggedIn) return res.redirect('/login');

    // must be specific user role
    if (!roles.includes(req.session.role)) return res.status(400).end();
    next();
  };
}

module.exports = withAuth;
