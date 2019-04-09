import { LitElement, html, css, customElement } from 'lit-element';

@customElement('sci-page-dashboard')
class Dashboard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1000px;
        margin: auto;
        padding: 20px;
      }

      h1, h2 {
        margin: 0 auto;
        text-align: center;
      }

      h1 {
        font-size: 3em;
        font-weight: normal;
      }

      h2 {
        margin: 20px;
        font-family: 'Roboto Slab', serif;
        font-weight: lighter;
      }
    `;
  }

  render() {
    return html`
      <h1>Salte CI</h1>
      <h2>The simplest and most<br>versatile build platform.</h2>
      <sci-terminal menu markdown="${require('@salte-ci/src/markdown/ci-example.md')}"></sci-terminal>
      <a href="/test">Test</a>
    `;
  }
}

export default Dashboard;
