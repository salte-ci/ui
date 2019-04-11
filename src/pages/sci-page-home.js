import { LitElement, html, css, customElement } from 'lit-element';

import { PageMixin } from '@salte-ci/src/mixins/sci-pages.js';

import '@salte-ci/src/sci-terminal.js';
import '@salte-ci/src/sci-code-editor.js';

import fs from 'fs';

/* Buffer */

@customElement('sci-page-home')
class Home extends PageMixin(LitElement) {
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

      h1, h2 {
        margin: 0 auto;
        text-align: center;
      }

      h1 {
        font-size: 3em;
        font-weight: normal;
      }

      h2 {
        margin: 20px;
        font-family: 'Roboto Slab', serif;
        font-weight: lighter;
      }
    `;
  }

  render() {
    return html`
      <h1>Salte CI</h1>
      <h2>The simplest and most<br>versatile build platform in existence.</h2>
      <sci-terminal menu>
        <sci-code-editor
          .code="${this.code}"
          read-only>
        </sci-code-editor>
      </sci-terminal>
    `;
  }

  static get properties() {
    return {
      code: String
    };
  }

  constructor() {
    super();

    this.code = fs.readFileSync('src/examples/ci-example.yml', 'UTF8');
  }
}

export default Home;
