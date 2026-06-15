'use strict';

const settings = require('ep_etherpad-lite/node/utils/Settings');
const { getUser } = require('./lib/user');

// Config (settings.json -> "ep_current_user": { ... }). All optional.
//   path : URL of the endpoint (default "/whoami")
const cfg = settings.ep_current_user || {};
const path = String(cfg.path || '/whoami').replace(/\/+$/, '');

exports.expressCreateServer = (hookName, context) => {
  // GET /whoami -> { displayName, sub }  (404 when nobody is logged in)
  context.app.get(path, (req, res) => {
    const user = getUser(req);
    if (!user) return res.status(404).json({ error: 'not logged in' });
    res.set('Cache-Control', 'no-store');
    res.json(user);
  });
};
