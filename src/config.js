const configs = {
  'http://local.salte.ci': {
    url: 'http://localhost:8080',
    idp: {
      providerUrl: 'https://salte-alpha.auth0.com',
      audience: 'https://api.alpha.salte.ci',
      clientId: 'dBtm5H8Q2k7uh8xoYj2J9y2OkjzHmHYe'
    },
    oauth: {
      github: '9dad4396a89d95d3a741',
      gitlab: '45929db1758cba74f0b0fa9b04895411e72ec00359bd94d6a4de33b1aa83078f',
      bitbucket: 'VqptWh6yxkjHrBLHWc'
    }
  },
  'https://alpha.salte.ci': {
    url: 'https://api.alpha.salte.ci',
    idp: {
      providerUrl: 'https://salte-alpha.auth0.com',
      audience: 'https://api.alpha.salte.ci',
      clientId: 'dBtm5H8Q2k7uh8xoYj2J9y2OkjzHmHYe'
    },
    oauth: {
      github: 'afe8467ab8dd11850e6d',
      gitlab: '45929db1758cba74f0b0fa9b04895411e72ec00359bd94d6a4de33b1aa83078f',
      bitbucket: 'mt2FzRGPNSFv55kGye'
    }
  },
  'https://salte.ci': {
    url: 'https://api.salte.ci',
    idp: {
      providerUrl: 'https://salte.auth0.com',
      audience: 'https://api.salte.ci',
      clientId: 'HU4G6w7WEcJ1zM5kq5TXrBYwayGc4pZ2'
    },
    oauth: {
      github: null,
      gitlab: null,
      bitbucket: null
    }
  }
};

const config = configs[location.origin] || configs['http://local.salte.ci'];

if (location.hostname.indexOf('review-') === 0) {
  config.environment = 'review';
} else if (['localhost', 'local.salte.ci'].includes(location.hostname)) {
  config.environment = 'local';
} else if (['salte.ci'].includes(location.hostname)) {
  config.environment = 'live';
} else {
  config.environment = 'alpha';
}

export { configs, config };
export default config;
