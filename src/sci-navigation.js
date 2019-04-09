import { LitElement, html, css, customElement } from 'lit-element';

@customElement('sci-navigation')
class Navigation extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        height: 60px;
        background: white;
        border-bottom: 1px solid lightgray;
      }

      #content {
        display: flex;
        flex: 1;
        height: 100%;
        max-width: 1000px;
        padding: 0 20px;
        margin: auto;
      }

      #content ::slotted(a) {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        padding: 0 20px;
      }

      #content ::slotted(a:hover) {
        background: #fafafa;
      }

      #content ::slotted(sci-button) {
        align-self: center;
      }

      #content ::slotted(.ml-auto) {
        margin-left: auto;
      }
    `;
  }

  render() {
    return html`
      <div id="content">
        <slot></slot>
      </div>
    `;
  }
}

export default Navigation;
