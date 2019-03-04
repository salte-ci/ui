import { LitElement, html, css, customElement } from 'lit-element';

import AuthMixin from '@salte-ci/src/mixins/sci-auth.js';

import '@salte-ci/src/sci-button.js';

@customElement('sci-login-button')
class LoginButton extends AuthMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        margin-left: auto;
      }
    `;
  }

  render() {
    return html`
      ${this.authenticated ? html`
        Logged In
      ` : html`
        <sci-button @click="${this.login}">Login</sci-button>
      `}
    `;
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logoutWithRedirect();
  }
}

export default LoginButton;
