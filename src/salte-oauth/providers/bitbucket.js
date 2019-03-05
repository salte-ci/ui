import Provider from './provider.js';

export default class Bitbucket extends Provider {
  get name() {
    return 'bitbucket';
  }

  get defaults() {
    return { url: 'https://bitbucket.org' };
  }

  get validation() {
    return {
      state: false
    };
  }

  url({ state }) {
    return `${this.options.url}/site/oauth2/authorize?client_id=${this.options.clientID}&response_type=code&state=${state}`;
  }
}
