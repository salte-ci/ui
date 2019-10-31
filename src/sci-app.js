import { LitElement, html, css, customElement } from 'lit-element';
import '@salte-io/salte-pages';

import page from 'page';

import { version } from '../package.json';

import { AuthMixin } from './mixins/sci-auth.js';
import './shared/sci-navigation.js';
import './shared/sci-icon.js';

@customElement('sci-app')
export class App extends AuthMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      salte-pages {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
      }

      salte-pages > * {
        width: 100%;
        max-width: 1000px;
        padding: 10px;
        box-sizing: border-box;
      }
    `;
  }

  render() {
    return html`
      <sci-navigation>
        <sci-button theme="secondary" size="large" rounded href="/" icon="logo">
          Salte CI
        </sci-button>
        ${this.auth.provider('auth0').idToken.expired ? html`
          <sci-button theme="accent" size="large" @click="${() => this.auth.login('auth0')}">
            Sign Up
          </sci-button>
        ` : html`
          <sci-button theme="secondary" size="large" @click="${() => this.auth.logout('auth0')}" icon="${this.auth.provider('auth0').idToken.user.picture}">
            ${this.auth.provider('auth0').idToken.user.name}
          </sci-button>
        `}
      </sci-navigation>
      <salte-pages selected="${this.page}" fallback="404" @load="${this.load}">
        <sci-page-home page="home"></sci-page-home>
        <sci-page-dashboard page="dashboard"></sci-page-dashboard>
        <sci-page-repository page="repository"></sci-page-repository>
        <sci-page-branch page="branch"></sci-page-branch>
        <sci-page-build page="build"></sci-page-build>
        <sci-page-stylesheet page="stylesheet"></sci-page-stylesheet>
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

      this.page = page || 'home';
    });
    page();
  }

  load({ detail: page }) {
    let promise = null;
    switch (page) {
      case 'home':
        promise = import('./pages/sci-page-home.js');
        break;
      case 'dashboard':
        promise = import('./pages/sci-page-dashboard.js');
        break;
      case 'repository':
        promise = import('./pages/sci-page-repository.js');
        break;
      case 'branch':
        promise = import('./pages/sci-page-branch.js');
        break;
      case 'build':
        promise = import('./pages/sci-page-build.js');
        break;
      case 'stylesheet':
        promise = import('./pages/sci-page-stylesheet.js');
        break;
      case '404':
        promise = import('./pages/sci-page-404.js');
        break;
      default: throw new Error(`Unknown Page. (${page})`);
    }

    promise.then(() => {
      console.log('Loaded the page successfully!')
    }).catch((error) => {
      console.error(error);
    });
  }
}
