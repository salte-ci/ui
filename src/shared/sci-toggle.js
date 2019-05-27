import { LitElement, html, css, customElement } from 'lit-element';

import './sci-line.js';

@customElement('sci-toggle')
export class Toggle extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        position: relative;
        border-radius: 7px;
        width: 50px;
        height: 40px;
        cursor: pointer;
        outline: none;
        box-shadow: inset 0 2px 0px 0px var(--app-darken-color);

        background: var(--app-accent-color);
        transition: 0.15s ease-in-out;
        transition-property: background-color;
      }

      .thumbnail {
        position: absolute;
        top: 0;
        bottom: 2px;
        width: 60%;
        background: var(--app-secondary-color);
        border-radius: 6px;
        box-shadow:
          0 2px 0 var(--app-darken-color),
          0 2px 0 var(--app-secondary-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 5px;
        box-sizing: border-box;

        left: 0;
        transition: 0.15s ease-in-out;
        transition-property: left, transform;
      }

      :host([checked]) .thumbnail {
        left: 100%;
        transform: translateX(-100%);
      }

      :host([checked]) {
        background: var(--app-success-color);
      }
    `;
  }

  render() {
    return html`
      <div class="thumbnail">
        <sci-line theme="${this.checked ? 'success' : 'accent'}"></sci-line>
        <sci-line theme="${this.checked ? 'success' : 'accent'}"></sci-line>
        <sci-line theme="${this.checked ? 'success' : 'accent'}"></sci-line>
      </div>
    `;
  }
  constructor() {
    super();
    this.setAttribute('role', 'checkbox');
    this.setAttribute('tabindex', '0');
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', () => {
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent('change', {
        detail: this.checked
      }))

    });
  }

  static get properties() {
    return {
      checked: {
        type: Boolean,
        reflect: true
      }
    }
  }
}
