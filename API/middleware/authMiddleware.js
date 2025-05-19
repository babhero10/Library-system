// auth.js
export function requireAuth(req, res, next) {
  // Defensive check for session and auth flag
  if (!req.session || !req.session.auth) {
    return res
      .status(401)                                             // set status
      .set('WWW-Authenticate', 'Bearer realm="example"')       // spec compliance
      .json({ error: 'Authentication required.' });            // send body & end response
  }
  next(); // user is authenticated
}

// roles.js
export function requireRole(role) {
  return (req, res, next) => {
    const user = req.session.user;                             // where your user object lives
    if (!user || !user.roles || !user.roles.includes(role)) {
      return res.sendStatus(403);                              // sets 403 and sends "Forbidden"
    }
    next(); // user has required role
  };
}
