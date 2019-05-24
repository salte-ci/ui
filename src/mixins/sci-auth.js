import { SalteAuth } from '@salte-auth/salte-auth';
import { Auth0 } from '@salte-auth/auth0';
import { GitHub } from '@salte-auth/github';
import { Redirect } from '@salte-auth/redirect';

import { config } from '../config.js';

const auth = new SalteAuth({
  providers: [
    new Auth0({
      url: 'https://salte.auth0.com',
      audience: config.providers.auth0.audience,
      clientID: config.providers.auth0.clientID,
      responseType: 'id_token token'
    }),

    new GitHub({
      clientID: config.providers.github,
      responseType: 'code'
    })
  ],

  handlers: [
    new Redirect({
      default: true
    })
  ]
});

export { auth };
export function AuthMixin(superClass) {
  return class extends superClass {
    get auth() {
      return auth;
    }

    provider(name) {
      return this.auth.provider(name);
    }
  }
}
