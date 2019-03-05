import uuid from 'node-uuid';

import Provider from './providers/provider.js'; // eslint-disable-line

import Events from './salte-event.js';

/**
 * The configuration for salte auth
 * @typedef {Object} Config
 * @property {Provider[]} providers The list of available providers.
 * @property {('storage'|'local')} storage The storage type for validation
 */

class OAuth extends Events {
  /**
   *
   * @param {Config} config
   */
  constructor(config) {
    super();
    this.$config = config;

    this.$config = Object.assign({
      storage: 'local'
    }, this.$config);

    const redirectUrl = this.getItem('redirect-url');
    if (redirectUrl) {
      this.$parse();
      this.setItem('redirect-url');
      history.pushState('', document.title, redirectUrl);
      setTimeout(() => this.$fire('login'));
    }
  }

  $parse() {
    const url = new URL(location.href);

    const provider = this.getItem('provider');
    this.setItem('provider');

    url.searchParams.forEach((value, key) => {
      this.setItem(`${provider}.${key}`, value);
    });
  }

  login(name) {
    const state = uuid.v4();

    const provider = this.$config.providers.find((provider) => provider.name === name);

    this.setItem('state', state);
    this.setItem('redirect-url', location.href);
    this.setItem('provider', name);

    location.href = provider.url({ state });
  }

  get storage() {
    switch (this.$config.storage) {
      case 'session': return sessionStorage;
      case 'local': return localStorage;
      default: throw new Error(`Unknown storage type. (${this.$config.storage})`);
    }
  }

  getItem(name) {
    return this.storage.getItem(`salte.oauth.${name}`);
  }

  setItem(name, value) {
    if ([undefined, null, ''].includes(value)) {
      this.storage.removeItem(`salte.oauth.${name}`);
    } else {
      this.storage.setItem(`salte.oauth.${name}`, value);
    }
  }
}

export { OAuth };
export default OAuth;
