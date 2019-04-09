import { LitElement, html, css, customElement } from 'lit-element';

import page from 'page';

import { version } from '@salte-ci/package.json';

import '@salte-ci/src/sci-navigation.js';
import '@salte-ci/src/sci-pages.js';
import '@salte-ci/src/sci-button.js';

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
        <sci-button class="ml-auto">Login</sci-button>
      </sci-navigation>

      <sci-pages selected="${this.page}" fallback="dashboard" @load="${this.load}">
        <sci-page-dashboard page="dashboard"></sci-page-dashboard>
        <sci-page-test page="test"></sci-page-test>
      </sci-pages>
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
    page('/:page?', (context) => {
      this.page = context.params.page || null;
    });
    page();
  }

  load({ detail: page }) {
    let promise = null;
    switch (page) {
      case 'dashboard':
        promise = import('@salte-ci/src/pages/sci-page-dashboard.js');
        break;
      case 'test':
        promise = import('@salte-ci/src/pages/sci-page-test.js');
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
