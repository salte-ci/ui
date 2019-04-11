import { LitElement, html, css, customElement } from 'lit-element';

import { PageMixin } from '@salte-ci/src/mixins/sci-pages.js';
import { AuthMixin } from '@salte-ci/src/mixins/sci-auth.js';

import '@salte-ci/src/sci-card.js';
import '@salte-ci/src/sci-button.js';

@customElement('sci-page-account')
class Account extends PageMixin(AuthMixin(LitElement)) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        max-width: 1000px;
        margin: auto;
        padding: 20px;
      }

      h1, h2, h3 {
        margin: 0;
        line-height: 1;
      }

      .services {
        display: grid;
        grid-gap: 10px;
      }

      .service {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 1fr 1fr max-content;
      }
    `;
  }

  render() {
    return html`
      <sci-card>
        <h1>Account Settings</h1>
        <h2>Linked Services</h2>
        <div class="services">
          ${this.services.map((service) => html`
            <div class="service">
              <div>${service.friendly_name}</div>
              ${service.linked ? html`<div>${service.username}</div>` : ''}
              <sci-button @click="${() => this.auth.login(service.id)}">${service.linked ? 'Unlink' : 'Link'} ${service.friendly_name}</sci-button>
            </div>
          `)}
        </div>
      </sci-card>
    `;
  }

  static get properties() {
    return {
      services: Array
    };
  }

  constructor() {
    super();

    this.services = [{
      id: 'github',
      friendly_name: 'GitHub',
      username: 'nick-woodward',
      linked: true
    }, {
      id: 'bitbucket',
      friendly_name: 'Bitbucket',
      linked: false
    }, {
      id: 'gitlab',
      friendly_name: 'GitLab',
      linked: false
    }];
  }
}

export default Account;
