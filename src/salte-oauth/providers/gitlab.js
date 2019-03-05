import Provider from './provider.js';

export default class GitLab extends Provider {
  get name() {
    return 'gitlab';
  }

  get defaults() {
    return { url: 'https://gitlab.com' };
  }

  url({ state }) {
    return `${this.options.url}/oauth/authorize?client_id=${this.options.clientID}&redirect_uri=${encodeURIComponent(this.options.redirectUrl)}&response_type=code&state=${state}`;
  }
}
