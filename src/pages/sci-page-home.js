import { LitElement, html, css, customElement } from 'lit-element';

import { AuthMixin } from '../mixins/sci-auth.js';
import { PageMixin } from '../mixins/sci-pages.js';

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
    `;
  }
}
