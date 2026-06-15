'use strict';

// Reads the logged-in user from the request session. The session is populated
// by auth plugins such as ep_openid_connect (which sets req.session.user).
// Kept in its own module so other plugins can require it and reuse the exact
// same logic in-process.
//
// Returns { displayName, sub } or null when nobody is authenticated.
function getUser(req) {
  const u = req && req.session && req.session.user;
  if (!u) return null;

  const displayName =
    u.displayname || u.name || (u.userinfo && u.userinfo.name) || null;
  const sub =
    u.username || u.sub || (u.userinfo && u.userinfo.sub) || null;

  if (!displayName && !sub) return null;
  return { displayName, sub };
}

exports.getUser = getUser;
