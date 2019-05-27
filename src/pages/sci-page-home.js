import { LitElement, html, css, customElement } from 'lit-element';

import { AuthMixin } from '../mixins/sci-auth.js';
import { PageMixin } from '../mixins/sci-pages.js';

import '../shared/sci-button.js';

@customElement('sci-page-home')
export class HomePage extends AuthMixin(PageMixin(LitElement)) {
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
      <h1>Home</h1>
      <div>
        ${this.auth.provider('auth0').idToken.user ? html`
          <sci-button theme="bitbucket" icon="bitbucket" @click="${() => this.auth.login('bitbucket')}">
            Bitbucket
          </sci-button>
          <sci-button theme="github" icon="github" @click="${() => this.auth.login('github')}">
            GitHub
          </sci-button>
          <sci-button theme="gitlab" icon="gitlab" @click="${() => this.auth.login('gitlab')}">
            GitLab
          </sci-button>
        ` : ''}
      </div>
    `;
  }
}
