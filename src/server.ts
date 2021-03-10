require("dotenv").config();

import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import {
  auth,
  ConfigParams,
  OpenidRequest,
  OpenidResponse,
} from "express-openid-connect";

// Reference: https://codechips.me/sapper-auth0-authentication/

function fixUrl(url: string) {
  if (!url.match(/http(s)?\:\/\//g)) {
    url = `http://${url}`;
  }
  return url;
}

const {
  PORT = 3000,
  OAUTH_BASE_URL = "http://localhost:3000",
  NODE_ENV = "development",
  OAUTH_ISSUER_BASE_URL = "https://toyteller.us.auth0.com",
  OAUTH_CLIENT_ID = "2hNLFhSu1KTOWQWgnvunrXvRl6kiHbjd",
  COOKIE_SECRET = "storyteller-cookie-secret-788364993",
  OAUTH_CLIENT_SECRET = "",
  OAUTH_AUDIENCE = "https://toyteller.us.auth0.com/api/v2/",
} = process.env;
const dev = NODE_ENV === "development";

const config: ConfigParams = {
  attemptSilentLogin: true,
  authRequired: false,
  auth0Logout: true,
  baseURL: fixUrl(OAUTH_BASE_URL),
  clientID: OAUTH_CLIENT_ID,
  issuerBaseURL: fixUrl(OAUTH_ISSUER_BASE_URL),
  secret: COOKIE_SECRET,
  clientSecret: OAUTH_CLIENT_SECRET,
  authorizationParams: {
    scope: "openid profile offline_access email",
    response_type: "code",
    audience: fixUrl(OAUTH_AUDIENCE),
  },
};

const app = express() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    express.json(),
    auth(config),
    (req: OpenidRequest, res: OpenidResponse, next?: (err?: Error) => void) => {
      return sapper.middleware({
        session: () => {
          return {
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user,
          };
        },
      })(req, res, next);
    }
  )
  .listen(PORT);

export default app;
