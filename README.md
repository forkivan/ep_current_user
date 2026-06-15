# ep_current_user

Exposes the **current logged-in Etherpad user** as JSON — a small `whoami`
endpoint. Your own external site, landing page or app can call it to find out
who is signed in, instead of poking around the database or the login session
yourself.

It reads the user from the request session, which is populated by auth plugins
such as [`ep_openid_connect`](https://github.com/ether/ep_openid_connect).

## Endpoint

Default URL is `/whoami` (configurable).

### `GET /whoami`

```json
{ "displayName": "Ivan Forkaliuk", "sub": "ivan@example.org" }
```

Returns `404` when nobody is logged in.

## Why this exists

Etherpad's official `/api/1/...` is a stateless, apikey-based admin API — it
never sees the browser session, so it cannot tell you **who is logged in**. This
plugin runs inside Etherpad and reads the session directly, so external apps
don't need any database access to answer that question.

## For other plugins

The data layer is exported so other plugins can reuse it in-process:

```js
const { getUser } = require('ep_current_user/lib/user');
const user = getUser(req); // { displayName, sub } or null
```

## Configuration

Optional. In `settings.json`:

```json
"ep_current_user": {
  "path": "/whoami"
}
```

| Option | Default    | Meaning              |
|--------|------------|----------------------|
| `path` | `/whoami`  | URL of the endpoint. |

## Install

```sh
cd /path/to/etherpad
pnpm run plugins i ep_current_user
```

> Has no effect unless authentication is configured (e.g. `requireAuthentication`
> with `ep_openid_connect`) — otherwise there is no logged-in user to report.

License: Apache-2.0.
