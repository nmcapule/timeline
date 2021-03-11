import type { OpenidRequest } from "express-openid-connect";

/** https://codechips.me/sapper-auth0-authentication/ */
export const getAccessToken = async (req: OpenidRequest) => {
  let { access_token, isExpired, refresh } = req.oidc.accessToken;

  if (isExpired()) {
    ({ access_token } = await refresh());
  }
  return access_token;
};
