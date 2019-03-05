import { LitElement, html, css, customElement } from 'lit-element';

import PageMixin from '@salte-ci/src/mixins/sci-pages.js';
import AuthMixin from '@salte-ci/src/mixins/sci-auth.js';

import '@salte-ci/src/sci-button.js';


@customElement('sci-page-account')
class Account extends PageMixin(AuthMixin(LitElement)) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1000px;
        margin: auto;
        padding: 20px;
      }
    `;
  }

  render() {
    return html`
      <sci-button @click="${() => this.oauth.login('github')}">GitHub</sci-button>
      <sci-button @click="${() => this.oauth.login('gitlab')}">GitLab</sci-button>
      <sci-button @click="${() => this.oauth.login('bitbucket')}">Bitbucket</sci-button>
    `;
  }
}

export default Account;
