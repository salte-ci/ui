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
      }
    `;
  }

  render() {
    return html`
      Home
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
