import { SalteAuth } from '@salte-auth/salte-auth';
import { Auth0 } from '@salte-auth/auth0';
import { GitHub } from '@salte-auth/github';
import { Bitbucket } from '@salte-auth/bitbucket';
import { Redirect } from '@salte-auth/redirect';

import config from '@salte-ci/src/config.js';

const auth = new SalteAuth({
  providers: [
    new Auth0({
      url: 'https://salte.auth0.com',
      audience: config.providers.auth0.audience,
      clientID: config.providers.auth0.clientID,
      responseType: 'id_token token',

      endpoints: [
        /^http:\/\/localhost:8080\/(?!socket.io\/)/
      ]
    }),

    new GitHub({
      clientID: config.providers.github,
      responseType: 'code'
    }),

    new Bitbucket({
      clientID: config.providers.bitbucket,
      responseType: 'code'
    })
  ],

  handlers: [
    new Redirect({
      default: true
    })
  ]
});

const AuthMixin = function(superClass) {
  return class extends superClass {
    get auth() {
      return auth;
    }

    provider(name) {
      return this.auth.provider(name);
    }
  }
};

export { auth, AuthMixin };
export default AuthMixin;
