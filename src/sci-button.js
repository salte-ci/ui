import { LitElement, html, css, customElement } from 'lit-element';

@customElement('sci-button')
class Button extends LitElement {
  static get styles() {
    return css`
      :host {
        padding: 5px 20px;
        border-radius: 3px;
        cursor: pointer;

        color: #1B1D23;
        border: 1px solid #1B1D23;

        transition: 0.15s ease-in-out;
        transition-property: background-color, color;
      }

      :host(:hover) {
        background: #1B1D23;
        color: #fafafa;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

export default Button;
