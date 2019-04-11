const configs = {
  'http://local.salte.ci': {
    url: 'http://localhost:8080',
    environment: 'local',
    providers: {
      auth0: {
        audience: 'https://api.alpha.salte.ci',
        clientID: 'w9hJqUpalRBXq9x7kMSwIfCaMqv6VA6P'
      },
      github: 'Iv1.a172bb140c3987bd'
    }
  },
  'https://alpha.salte.ci': {
    url: 'https://api.alpha.salte.ci',
    environment: 'alpha',
    providers: {
      auth0: {
        audience: 'https://api.alpha.salte.ci',
        clientID: 'w9hJqUpalRBXq9x7kMSwIfCaMqv6VA6P'
      },
      github: 'Iv1.f01b6ae580b6cabe'
    }
  },
  'https://salte.ci': {
    url: 'https://api.salte.ci',
    environment: 'live',
    providers: {
      auth0: {
        audience: 'https://api.salte.ci',
        clientID: 'xTF6gsiNbajF0lBA5Jy6ecpCE6wAlc4Y'
      },
      github: 'Iv1.4989b75b50f468af'
    }
  }
};

const config = configs[location.origin] || configs['http://local.salte.ci'];

if (location.hostname.indexOf('review-') === 0) {
  config.environment = 'review';
}

export { configs, config };
export default config;
