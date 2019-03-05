import Provider from './provider.js';

export default class GitHub extends Provider {
  get name() {
    return 'github';
  }

  get defaults() {
    return { url: 'https://github.com' };
  }

  url({ state }) {
    return `${this.options.url}/login/oauth/authorize?client_id=${this.options.clientID}&state=${state}`;
  }
}
