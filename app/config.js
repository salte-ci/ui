/* istanbul ignore file */
// Impossible to test at the moment since we have to require the file multiple times.
// May make sense to create wrapper functions purely for testing.

import * as WindowUtils from './utils/window';

export const environments = {
  'https://salte.ci': 'live',
  'https://alpha.salte.ci': 'alpha',
  'https://local.salte.ci': 'local',
};

export const localhost = WindowUtils.origin().includes('localhost');
export const environment = environments[WindowUtils.origin()] || 'alpha';

export const configs = {
  live: {
    url: 'https://api.salte.ci',
    providers: {
      auth0: {
        audience: 'https://api.salte.ci',
        clientID: 'xTF6gsiNbajF0lBA5Jy6ecpCE6wAlc4Y',
      },
      bitbucket: 'j2XgJHYtED8StLwWT4',
      github: 'Iv1.4989b75b50f468af',
      gitlab: 'c9551083bd333a37e069fc5d828e06a27d4d3e52f5ac2f0a9ff7e214e81aca37',
    },
  },
  alpha: {
    url: 'https://api.alpha.salte.ci',
    providers: {
      auth0: {
        audience: 'https://api.alpha.salte.ci',
        clientID: 'w9hJqUpalRBXq9x7kMSwIfCaMqv6VA6P',
      },
      bitbucket: 'mt2FzRGPNSFv55kGye',
      github: 'Iv1.f01b6ae580b6cabe',
      gitlab: '7f20161ad2bcbac636fd6a38c83f4c738a8ebf459d4cc8ad43bcde3d5cad9c99',
    },
  },
  local: {
    url: 'http://localhost:8080',
    providers: {
      auth0: {
        audience: 'https://api.alpha.salte.ci',
        clientID: 'w9hJqUpalRBXq9x7kMSwIfCaMqv6VA6P',
      },
      bitbucket: 'cCPUVZddKEtQdcLGxb',
      github: 'Iv1.a172bb140c3987bd',
      gitlab: '7f20161ad2bcbac636fd6a38c83f4c738a8ebf459d4cc8ad43bcde3d5cad9c99',
    },
  },
};

export const config = configs[environment];

export const ENDPOINTS = environment === 'alpha' ? [config.url, 'http://localhost:8080'] : [config.url];
