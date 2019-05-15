import { LitElement, html, css, customElement } from 'lit-element';
import '@salte-io/salte-pages';

import page from 'page';

import { version } from '@salte-ci/package.json';

import { AuthMixin } from '@salte-ci/src/mixins/sci-auth.js';

@customElement('sci-app')
export class App extends AuthMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;

        --app-primary-color: #1B1D23;
        --app-secondary-color: #F5F6FA;
        --app-white-color: #FFFFFF;
        --app-accent-color: #EF5777;
        --app-darken-color: rgba(0, 0, 0, 0.4);
        --app-success-color: #5ED48D;
        --app-warning-color: #D4A55E;
        --app-danger-color: #D46A5E;

        --app-github-color: #333333;
        --app-bitbucket-color: #0052CC;
        --app-gitlab-color: #554488;
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
      <salte-pages selected="${this.page}" fallback="404" @load="${this.load}">
        <sci-page-home page="home"></sci-page-home>
        <sci-page-dashboard page="dashboard"></sci-page-dashboard>
        <sci-page-repository page="repository"></sci-page-repository>
        <sci-page-branch page="branch"></sci-page-branch>
        <sci-page-build page="build"></sci-page-build>
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
        promise = import('@salte-ci/src/pages/sci-page-home.js');
        break;
      case 'dashboard':
        promise = import('@salte-ci/src/pages/sci-page-dashboard.js');
        break;
      case 'repository':
        promise = import('@salte-ci/src/pages/sci-page-repository.js');
        break;
      case 'branch':
        promise = import('@salte-ci/src/pages/sci-page-branch.js');
        break;
      case 'build':
        promise = import('@salte-ci/src/pages/sci-page-build.js');
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
