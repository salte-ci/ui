import { LitElement, css, customElement } from 'lit-element';

@customElement('sci-line')
export class Line extends LitElement {
  static get styles() {
    return css`
      :host {
        height: 2px;
        background: var(--sci-line-color);

        transition: 0.15s ease-in-out;
        transition-property: background-color;
      }
    `;
  }

  static get properties() {
    return {
      theme: String
    };
  }

  constructor() {
    super();

    this.theme = 'accent';
  }

  updated(changedProperties) {
    if (changedProperties.has('theme')) {
      this.style.setProperty('--sci-line-color', `var(--app-${this.theme}-color)`);
    }
  }
}
