import { LitElement, html, css, customElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

@customElement('sci-button')
export class Button extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
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
        margin-bottom: 4px;
        border-radius: inherit;

        color: var(--sci-button-color);
        background: var(--sci-button-background-color);

        transition: 0.05s ease-in-out;
        transition-property: transform;
      }

      :host(:active) .content {
        transform: translateY(4px);
      }

      :host([size="small"]) .content {
        padding: 7px 20px;
        font-size: 14px;
        font-weight: 300;
      }

      :host([size="large"]) .content {
        padding: 10px 30px;
        font-size: 26px;
        font-weight: bold;
        font-family: 'Roboto Slab', serif;
      }

      :host([size="small"][rounded]) .button {
        border-radius: 19.5px;
      }

      :host([size="large"][rounded]) .button {
        border-radius: 29.5px;
      }

      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 4px;
        border-radius: inherit;
        box-shadow:
          0 4px 0 var(--app-darken-color),
          0 4px 0 var(--sci-button-background-color);
      }
    `;
  }

  render() {
    return html`
      <a class="button" href="${ifDefined(this.href)}" target="${this.target}" tabindex="${this.tabindex}" role="${this.role}">
        <div class="shadow"></div>
        <div class="content">
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
