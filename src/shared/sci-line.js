import { LitElement, css, customElement } from 'lit-element';

@customElement('sci-line')
export class Line extends LitElement {
  static get styles() {
    return css`
      :host {
        height: 2px;
        background: var(--app-accent-color);
        margin: 10px 0px;
      }
    `;
  }
}
