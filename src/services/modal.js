import 'web-animations-js/web-animations-next-lite.min.js';
import { html, css, LitElement, customElement } from 'lit-element';

import { OriginalTargetMixin } from '../mixins/sci-original-target';
import { UniqueElementMixin } from '../mixins/sci-unique-element';

import '../shared/sci-card.js';

export async function modal({ component, size = 'medium', properties = {} }) {
  if (document.querySelector('sci-modal')) {
    throw new Error('A modal already exists');
  }

  const modal = document.createElement('sci-modal');
  const content = document.createElement(component);

  modal.appendChild(content);
  document.body.appendChild(modal);

  modal.size = size;
  for (const [key, value] of Object.entries(properties)) {
    content[key] = value;
  }

  try {
    await modal.updateComplete;
    await modal.animation();

    return await new Promise((resolve, reject) => {
      modal.addEventListener('close', (ev) => {
        ev.stopPropagation();
        resolve(ev.detail);
      });

      modal.addEventListener('cancel', (ev) => {
        ev.stopPropagation();
        reject(ev.detail);
      });
    });
  } finally {
    await modal.animation(true);

    document.body.removeChild(modal);
  }
}

export function ModalMixin(superClass) {
  return class extends superClass {
    close(value) {
      this.dispatchEvent(new CustomEvent('close', {
        detail: value,
        bubbles: true
      }));
    }

    cancel(error) {
      this.dispatchEvent(new CustomEvent('cancel', {
        detail: error,
        bubbles: true
      }));
    }
  }
}

@customElement('sci-modal')
export class Modal extends ModalMixin(UniqueElementMixin(OriginalTargetMixin(LitElement))) {
  static get styles() {
    return css`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
      }

      :host([size="small"]) sci-card {
        width: 400px;
      }

      :host([size="medium"]) sci-card {
        width: 600px;
      }

      :host([size="large"]) sci-card {
        width: 800px;
      }

      sci-card {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, 0);
      }
    `;
  }

  static get properties() {
    return {
      size: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();

    this._backdropClose = this._backdropClose.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('click', this._backdropClose);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener('click', this._backdropClose);
  }

  _backdropClose(ev) {
    const path = this.getPath(ev);

    if (path.includes(this.$('card'))) return;

    this.cancel();
  }

  animation(hide) {
    const promises = [];

    promises.push(this.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], {
      duration: 250,
      delay: hide ? 250 : 0,
      easing: 'ease-in-out',
      direction: hide ? 'reverse' : 'normal'
    }).finished);

    promises.push(this.$('card').animate([
      { transform: 'translate(-50%, -10px)' },
      { transform: 'translate(-50%, 0)' }
    ], {
      duration: 500,
      easing: 'ease-in-out',
      direction: hide ? 'reverse' : 'normal'
    }).finished);

    return Promise.all(promises);
  }

  render() {
    return html`
      <sci-card id="card">
        <slot></slot>
      </sci-card>
    `;
  }
}
