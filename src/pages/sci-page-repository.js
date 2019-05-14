import { LitElement, html, css, customElement } from 'lit-element';

import { PageMixin } from '@salte-ci/src/mixins/sci-pages.js';

import '@salte-ci/src/sci-terminal.js';

@customElement('sci-page-repository')
class Repository extends PageMixin(LitElement) {
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
      Repository
    `;
  }
}

export default Repository;
