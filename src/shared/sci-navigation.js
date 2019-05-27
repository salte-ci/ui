import { LitElement, html, css, customElement } from 'lit-element';

@customElement('sci-navigation')
export class Navigation extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        padding: 0 5px;
        box-sizing: border-box;
        background: var(--app-primary-color);
      }

      .content {
        display: flex;
        justify-content: space-between;
        flex: 1;
        max-width: 1000px;
      }
    `;
  }

  render() {
    return html`
      <div class="content">
        <slot></slot>
      </div>
    `;
  }
}
