import { LitElement, html, css, customElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import './sci-icon.js';

@customElement('sci-button')
export class Button extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        height: 40px;
        font-size: 15px;
        font-weight: 300;
      }

      .button {
        display: inline-flex;
        position: relative;
        border-radius: 6px;
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        outline: none;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2px;
        border-radius: inherit;
        padding: 0 10px;

        color: var(--sci-button-color);
        background: var(--sci-button-background-color);

        transition: 0.05s ease-in-out;
        transition-property: transform;
      }

      sci-icon {
        margin-right: 5px;
      }

      :host([size="large"]) sci-icon {
        margin-right: 10px;
      }

      :host(:active) .content {
        transform: translateY(2px);
      }

      :host([size="large"]) {
        height: 50px;
        font-size: 24px;
        font-weight: bold;
        font-family: 'Roboto Slab', serif;
      }

      :host([size="large"]) .content {
        padding: 0 20px;
      }

      :host([size="large"][rounded]) .content {
        padding: 0 23px;
      }

      :host([icon]) .content {
        padding: 0 10px 0 5px;
      }

      :host([icon][rounded]) .content {
        padding: 0 10px 0 5px;
      }

      :host([size="large"][icon]) .content {
        padding: 0 15px 0 5px;
      }

      :host([size="large"][icon][rounded]) .content {
        padding: 0 20px 0 5px;
      }

      :host([rounded]) .button {
        border-radius: 20px;
      }

      :host([size="large"][rounded]) .button {
        border-radius: 25px;
      }

      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 2px;
        border-radius: inherit;
        box-shadow:
          0 2px 0 var(--app-darken-color),
          0 2px 0 var(--sci-button-background-color);
      }
    `;
  }

  render() {
    return html`
      <a class="button" href="${ifDefined(this.href)}" target="${ifDefined(this.target)}" tabindex="${this.tabindex}" role="${this.role}">
        <div class="shadow"></div>
        <div class="content">
          ${this.icon ? html`
            <sci-icon icon="${this.icon}" size="${this.size}" ?rounded="${this.rounded}"></sci-icon>
          ` : ''}
          <slot></slot>
        </div>
      </a>
    `;
  }

  static get properties() {
    return {
      href: String,
      target: String,
      tabindex: String,
      role: String,

      icon: {
        type: String,
        reflect: true
      },

      size: {
        type: String,
        reflect: true
      },
      rounded: {
        type: Boolean,
        reflect: true
      },
      theme: String
    }
  }

  constructor() {
    super();

    this.size = 'small';
    this.theme = 'primary';
    this.rounded = false;
    this.tabindex = '0';
    this.role = 'button';
  }

  updated(changedProperties) {
    if (changedProperties.has('theme')) {
      switch (this.theme) {
        case 'primary':
        case 'accent':
        case 'success':
        case 'warning':
        case 'danger':
        case 'github':
        case 'bitbucket':
        case 'gitlab':
          this.style.setProperty('--sci-button-color', 'var(--app-secondary-color)');
          break;
        case 'secondary':
        case 'white':
          this.style.setProperty('--sci-button-color', 'var(--app-primary-color)');
          break;
        default: throw new Error(`Unknown Theme. (${this.theme})`);
      }

      this.style.setProperty('--sci-button-background-color', `var(--app-${this.theme}-color)`);
    }
  }
}
