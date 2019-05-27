import { LitElement, html, css, customElement } from 'lit-element';
import './sci-line.js';

@customElement('sci-card')
export class Card extends LitElement {
  constructor() {
    super();
    this.header = "";
    this.theme = "default";
  }

  static get properties() {
    return {
      header: {
        type: String,
        reflect: true
      },
      theme: {
        type: String,
        reflect: true
      }
    }
  }

  static get styles() {
    return css`
      .header {
        font-size: 30px;
        text-align: center;
        line-height: normal;
      }

      :host([theme="default"]) {
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0 5px 20px 0px var(--app-darken-color);
        border-top: 10px solid var(--app-accent-color);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: var(--app-white-color);
      }

      :host([header]) {
        padding-top: 10px;
      }

      :host([theme="embed"]) {
        padding: 8px;
        border-radius: 6px;
        box-shadow: 0 0 5px 0px var(--app-darken-color) inset;
        border-top: 10px solid var(--app-accent-color);
        box-sizing: border-box;
      }

      sci-line {
        margin: 10px 0px;
      }
    `;
  }

  render() {
    return html`
      ${this.header ? html`
        <div class="header">${this.header}</div>
        <sci-line></sci-line>
      ` : html``}
      <slot></slot>
    `;
  }
}
