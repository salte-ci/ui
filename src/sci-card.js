import { LitElement, html, css, customElement } from 'lit-element';

@customElement('sci-card')
class Card extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-row-gap: 20px;
        padding: 20px;
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

export { Card };
