import { LitElement, html, css, customElement } from 'lit-element';

import { PageMixin } from '@salte-ci/src/mixins/sci-pages.js';

import '../shared/sci-button.js';
import '../shared/sci-toggle.js';
import '../shared/sci-card.js';

@customElement('sci-page-stylesheet')
export class StylesheetPage extends PageMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .grid {
        display: flex;
        flex-wrap: wrap;
      }

      .grid > * {
        margin: 5px;
      }

      .white {
        margin: 10px;
        background: var(--app-white-color);
      }

      .cards {
        display: flex;
      }

      .cards > * {
        flex: 1;
        margin: 10px;
      }
    `;
  }

  render() {
    return html`
      <h1>Stylesheet</h1>
      <h2>Buttons</h2>
      <div class="grid">
        <sci-button target="_blank">Primary</sci-button>
        <sci-button target="_blank" theme="secondary">Secondary</sci-button>
        <sci-button target="_blank" theme="white">White</sci-button>
        <sci-button target="_blank" theme="accent">Accent</sci-button>
        <sci-button target="_blank" theme="success">Success</sci-button>
        <sci-button target="_blank" theme="warning">Warning</sci-button>
        <sci-button target="_blank" theme="danger">Danger</sci-button>
        <sci-button target="_blank" theme="github">GitHub</sci-button>
        <sci-button target="_blank" theme="bitbucket">Bitbucket</sci-button>
        <sci-button target="_blank" theme="gitlab">GitLab</sci-button>
      </div>
      <h2>Buttons (Rounded)</h2>
      <div class="grid">
        <sci-button target="_blank" rounded>Primary</sci-button>
        <sci-button target="_blank" rounded theme="secondary">Secondary</sci-button>
        <sci-button target="_blank" rounded theme="white">White</sci-button>
        <sci-button target="_blank" rounded theme="accent">Accent</sci-button>
        <sci-button target="_blank" rounded theme="success">Success</sci-button>
        <sci-button target="_blank" rounded theme="warning">Warning</sci-button>
        <sci-button target="_blank" rounded theme="danger">Danger</sci-button>
        <sci-button target="_blank" rounded theme="github">GitHub</sci-button>
        <sci-button target="_blank" rounded theme="bitbucket">Bitbucket</sci-button>
        <sci-button target="_blank" rounded theme="gitlab">GitLab</sci-button>
      </div>
      <h2>Buttons (Large)</h2>
      <div class="grid">
        <sci-button target="_blank" size="large">Primary</sci-button>
        <sci-button target="_blank" size="large" theme="secondary">Secondary</sci-button>
        <sci-button target="_blank" size="large" theme="white">White</sci-button>
        <sci-button target="_blank" size="large" theme="accent">Accent</sci-button>
        <sci-button target="_blank" size="large" theme="success">Success</sci-button>
        <sci-button target="_blank" size="large" theme="warning">Warning</sci-button>
        <sci-button target="_blank" size="large" theme="danger">Danger</sci-button>
        <sci-button target="_blank" size="large" theme="github">GitHub</sci-button>
        <sci-button target="_blank" size="large" theme="bitbucket">Bitbucket</sci-button>
        <sci-button target="_blank" size="large" theme="gitlab">GitLab</sci-button>
      </div>
      <h2>Buttons (Large Rounded)</h2>
      <div class="grid">
        <sci-button target="_blank" size="large" rounded>Primary</sci-button>
        <sci-button target="_blank" size="large" rounded theme="secondary">Secondary</sci-button>
        <sci-button target="_blank" size="large" rounded theme="white">White</sci-button>
        <sci-button target="_blank" size="large" rounded theme="accent">Accent</sci-button>
        <sci-button target="_blank" size="large" rounded theme="success">Success</sci-button>
        <sci-button target="_blank" size="large" rounded theme="warning">Warning</sci-button>
        <sci-button target="_blank" size="large" rounded theme="danger">Danger</sci-button>
        <sci-button target="_blank" size="large" rounded theme="github">GitHub</sci-button>
        <sci-button target="_blank" size="large" rounded theme="bitbucket">Bitbucket</sci-button>
        <sci-button target="_blank" size="large" rounded theme="gitlab">GitLab</sci-button>
      </div>
      <h2>Toggle</h2>
      <div class="grid white">
        <sci-toggle></sci-toggle>
      </div>
      <h2>Card</h2>
      <div class="cards">
        <sci-card header="Header">This is where content goes.</sci-card>
        <sci-card header="Header">This is where content goes.</sci-card>
        <sci-card>This is where the content goes.  Really, I am not kidding.  I just want to cause a line wrap.<sci-card theme="embed">This is some inner content.</sci-card></sci-card>
      </div>
    `;
  }
}
