import { LitElement, html, css, customElement } from 'lit-element';

import { PageMixin } from '@salte-ci/src/mixins/sci-pages.js';

@customElement('sci-page-home')
export class HomePage extends PageMixin(LitElement) {
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
      Home
    `;
  }
}
