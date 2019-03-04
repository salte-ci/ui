import { LitElement, html, css, customElement } from 'lit-element';

import PageMixin from '@salte-ci/src/mixins/sci-pages.js';

import '@salte-ci/src/sci-terminal.js';

@customElement('sci-page-repository')
class Repository extends PageMixin(LitElement) {
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

      sci-terminal {
        width: 100%;
      }
    `;
  }

  render() {
    return html`
      <sci-terminal>
        <div>$ npm ci</div>
      </sci-terminal>
    `;
  }
}

export default Repository;
