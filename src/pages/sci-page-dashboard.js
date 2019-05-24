import { LitElement, html, css, customElement } from 'lit-element';

import { PageMixin } from '../mixins/sci-pages.js';

@customElement('sci-page-dashboard')
export class DashboardPage extends PageMixin(LitElement) {
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
      Dashboard
    `;
  }
}
