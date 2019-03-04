const configs = {
    'http://local.salte.ci': {
      url: 'http://localhost:8080',
      idp: {
        providerUrl: 'https://salte-alpha.auth0.com',
        audience: 'https://api.alpha.salte.ci',
        clientId: 'c27pK5CEkmpSYPCedj0A9S02HR0pTiUd'
      }
    },
    'https://alpha.salte.ci': {
      url: 'https://api.alpha.salte.ci',
      idp: {
        providerUrl: 'https://salte-alpha.auth0.com',
        audience: 'https://api.alpha.salte.ci',
        clientId: 'c27pK5CEkmpSYPCedj0A9S02HR0pTiUd'
      }
    },
    'https://salte.ci': {
      url: 'https://api.salte.ci',
      idp: {
        providerUrl: 'https://salte.auth0.com',
        audience: 'https://api.salte.ci',
        clientId: 'HU4G6w7WEcJ1zM5kq5TXrBYwayGc4pZ2'
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
  