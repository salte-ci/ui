import { LitElement, html, css, customElement } from 'lit-element';

import { PageMixin } from '../mixins/sci-pages.js';

import '../shared/sci-button.js';
import '../shared/sci-toggle.js';
import '../shared/sci-card.js';

import { modal } from '../services/modal.js';
import '../modals/sci-confirmation.js';

@customElement('sci-page-stylesheet')
export class StylesheetPage extends PageMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        background: rgba(0,0,0,0.2);
        padding: 20px;
        border-radius: 6px;
        margin: 20px auto;
      }

      .grid {
        display: flex;
        flex-wrap: wrap;
      }

      .grid > * {
        margin: 5px;
      }

      .cards {
        display: flex;
        flex-wrap: wrap;
      }

      .cards > * {
        flex: 1;
        margin: 10px;
        min-width: 300px;
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
      <div class="grid">
        <sci-toggle></sci-toggle>
      </div>
      <h2>Card</h2>
      <div class="cards">
        <sci-card header="Header">This is where content goes.</sci-card>
        <sci-card header="Header">This is where content goes.</sci-card>
        <sci-card>This is where the content goes.  Really, I am not kidding.  I just want to cause a line wrap.<sci-card theme="embed">This is some inner content.</sci-card></sci-card>
      </div>
      <h2>Modals</h2>
      <div class="grid">
        <sci-button @click="${() => {
          modal({
            component: 'sci-confirmation-modal'
          }).then((value) => console.log(value)).catch((error) => console.error(error));
        }}">Modals</sci-button>
      </div>
    `;
  }
}
