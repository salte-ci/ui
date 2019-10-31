import { LitElement, css, html, customElement } from 'lit-element';

import { ModalMixin } from '../services/modal';
import '../shared/sci-button';

@customElement('sci-confirmation-modal')
export class ConfirmationModal extends ModalMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
      }
    `;
  }

  render() {
    return html`
      <sci-button theme="accent" @click="${() => this.close()}">Confirm</sci-button>
      <sci-button @click="${() => this.cancel()}">Cancel</sci-button>
    `;
  }
}
