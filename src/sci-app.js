import { LitElement, html, css, customElement } from 'lit-element';
import '@salte-io/salte-pages';

import page from 'page';

import { version } from '@salte-ci/package.json';

import { AuthMixin } from '@salte-ci/src/mixins/sci-auth.js';

import '@salte-ci/src/sci-navigation.js';

@customElement('sci-app')
class App extends AuthMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `;
  }

  render() {
    return html`
      <sci-navigation>
        <a href="/">
          <img style="width: 50px; height: 50px;" src="https://raw.githubusercontent.com/salte-ci/logos/master/images/logo/transparent.svg?sanitize=true">
        </a>
        <a href="/docs">Documentation</a>
        ${this.provider('auth0').idToken.expired ? html`
          <sci-button @click="${() => this.auth.login('auth0')}" class="ml-auto">Login</sci-button>
        ` : html`
          <a href="/account" class="ml-auto">Account</a>
        `}
      </sci-navigation>

      <salte-pages selected="${this.page}" fallback="404" @load="${this.load}">
        <sci-page-home page="home"></sci-page-home>
        <sci-page-repository page="repository"></sci-page-repository>
        <sci-page-account page="account"></sci-page-account>
        <sci-page-404 page="404"></sci-page-404>
      </salte-pages>
    `;
  }

  static get properties() {
    return {
      version: {
        type: String,
        reflect: true
      },

      page: {
        type: String,
        reflect: true
      },

      pages: Object
    }
  }

  constructor() {
    super();

    this.version = version;
  }

  connectedCallback() {
    super.connectedCallback();
    document.body.removeAttribute('unresolved');
    page('*', (context) => {
      const [_dummy, page] = context.path.match(/^\/([^/?]+)?/);

      if (['github'].includes(page)) {
        this.page = 'repository';
      } else {
        this.page = page || 'home';
      }
    });
    page();
  }

  load({ detail: page }) {
    let promise = null;
    switch (page) {
      case 'home':
        promise = import('@salte-ci/src/pages/sci-page-home.js');
        break;
      case 'repository':
        promise = import('@salte-ci/src/pages/sci-page-repository.js');
        break;
      case 'account':
        promise = import('@salte-ci/src/pages/sci-page-account.js');
        break;
      case '404':
        promise = import('@salte-ci/src/pages/sci-page-404.js');
        break;
    }

    promise.then(() => {
      console.log('Loaded the page successfully!')
    }).catch((error) => {
      console.error(error);
    });
  }
}

export default App;
