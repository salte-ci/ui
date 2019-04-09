import { LitElement, html, css, customElement } from 'lit-element';

@customElement('sci-page-test')
class Test extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `;
  }

  render() {
    return html`
      This is a test page
      <a href="/">Dashboard</a>
    `;
  }
}

export default Test;
