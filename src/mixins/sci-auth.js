import { SalteAuth } from '@salte-io/salte-auth/dist/salte-auth.es6.js';

import OAuth from '@salte-ci/src/salte-oauth/salte-oauth.js';
import GitHub from '@salte-ci/src/salte-oauth/providers/github.js';
import GitLab from '@salte-ci/src/salte-oauth/providers/gitlab.js';
import Bitbucket from '@salte-ci/src/salte-oauth/providers/bitbucket.js';

import config from '@salte-ci/src/config.js';

const auth = new SalteAuth({
    providerUrl: config.idp.providerUrl,
    responseType: 'id_token token',
    redirectUrl: location.origin,
    clientId: config.idp.clientId,
    scope: 'openid',

    queryParams: {
      audience: config.idp.audience
    },

    endpoints: [
      /^http:\/\/localhost:8080\/(?!socket.io\/)/
    ],

    provider: 'auth0'
});

const oauth = new OAuth({
  providers: [
    new GitHub(config.oauth.github),
    new GitLab(config.oauth.gitlab),
    new Bitbucket(config.oauth.bitbucket)
  ]
});

const AuthMixin = function(superClass) {
    return class extends auth.mixin(superClass) {
      get oauth() {
        return oauth;
      }

      set user(user) {
          const oldUser = this._user;
          this._user = user;
          this.groups = this.user && this.user['http://salte.io/groups'] || [];

          this.requestUpdate('user', oldUser);
      }

      get user() {
          return this._user;
      }
    }
};

export { auth, oauth, AuthMixin };
export default AuthMixin;
