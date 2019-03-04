import { LitElement, html, css, customElement } from 'lit-element';
import '@salte-io/salte-pages';

import page from 'page';

import { version } from '@salte-ci/package.json';

import '@salte-ci/src/sci-navigation.js';
import '@salte-ci/src/sci-login-button.js';

@customElement('sci-app')
class App extends LitElement {
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
        <a href="/">Salte CI</a>
        <a href="/docs">Documentation</a>
        <sci-login-button class="ml-auto"></sci-login-button>
      </sci-navigation>

      <salte-pages selected="${this.page}" fallback="404" @load="${this.load}">
        <sci-page-home page="home"></sci-page-home>
        <sci-page-repository page="repository"></sci-page-repository>
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
      const [_dummy, page] = context.path.match(/^\/([^/]+)?/);

      if (['github', 'gitlab', 'bitbucket'].includes(page)) {
        this.page = 'repository';
      } else {
        this.page = context.params.page || 'home';
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
