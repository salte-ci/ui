import { LitElement, html, css, customElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import bitbucket from '../../images/icons/bitbucket.svg';
import github from '../../images/icons/github.svg';
import gitlab from '../../images/icons/gitlab.svg';
import logo from '../../images/icons/logo.svg';

const icons = {
  bitbucket,
  github,
  gitlab,
  logo
};

@customElement('sci-icon')
export class Icon extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        height: 30px;
        width: 30px;
        overflow: hidden;
        border-radius: 6px;
      }

      img, svg {
        width: 100%;
        height: 100%;
      }

      :host([rounded]) {
        border-radius: 50%;
      }

      :host([size="large"]) {
        height: 40px;
        width: 40px;
      }
    `;
  }

  render() {
    if (!this.icon) return '';

    if (this.icon.match(/^https?:\/\//)) {
      return html`
        <img src="${this.icon}">
      `;
    }

    return html`
      ${unsafeHTML(icons[this.icon])}
    `;
  }

  static get properties() {
    return {
      icon: String,

      rounded: {
        type: Boolean,
        reflect: true
      },

      size: {
        type: String,
        reflect: true
      }
    };
  }
}
