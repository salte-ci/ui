import { SalteAuth } from '@salte-auth/salte-auth';
import { Auth0 } from '@salte-auth/auth0';
import { Bitbucket } from '@salte-auth/bitbucket';
import { GitHub } from '@salte-auth/github';
import { GitLab } from '@salte-auth/gitlab';
import { Redirect } from '@salte-auth/redirect';

import { config } from './config';

export const auth = new SalteAuth({
  providers: [
    new Auth0({
      url: 'https://salte.auth0.com',
      audience: config.providers.auth0.audience,
      clientID: config.providers.auth0.clientID,
      responseType: 'id_token token',
      scope: 'openid profile',
    }),

    new Bitbucket({
      clientID: config.providers.bitbucket,
      responseType: 'code',
    }),

    new GitHub({
      clientID: config.providers.github,
      responseType: 'code',
    }),

    new GitLab({
      clientID: config.providers.gitlab,
      responseType: 'code',
    }),
  ],

  handlers: [
    new Redirect({
      default: true,
      navigate: 'history',
    }),
  ],
});
