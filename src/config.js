const configs = {
  'http://local.salte.ci': {
    url: 'http://localhost:8080',
    environment: 'local',
    providers: {
      auth0: {
        audience: 'https://api.alpha.salte.ci',
        clientID: 'w9hJqUpalRBXq9x7kMSwIfCaMqv6VA6P'
      },
      github: '9dad4396a89d95d3a741',
      gitlab: '45929db1758cba74f0b0fa9b04895411e72ec00359bd94d6a4de33b1aa83078f',
      bitbucket: 'VqptWh6yxkjHrBLHWc'
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
      github: 'afe8467ab8dd11850e6d',
      gitlab: '45929db1758cba74f0b0fa9b04895411e72ec00359bd94d6a4de33b1aa83078f',
      bitbucket: 'mt2FzRGPNSFv55kGye'
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
      github: null,
      gitlab: null,
      bitbucket: null
    }
  }
};

const config = configs[location.origin] || configs['http://local.salte.ci'];

if (location.hostname.indexOf('review-') === 0) {
  config.environment = 'review';
}

export { configs, config };
export default config;
