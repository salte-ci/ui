import 'web-animations-js/web-animations-next-lite.min.js';
import { LitElement, html, css, customElement } from 'lit-element';

import '@salte-ci/src/sci-terminal.js';

@customElement('sci-pages')
class Pages extends LitElement {
  static get styles() {
    return css`
      :host([loading]) {
        pointer-events: none;
      }

      :host ::slotted(:not([selected])) {
        display: none;
      }
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static get properties() {
    return {
      selected: String,
      fallback: String,
      attribute: String,

      loading: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();

    this.attribute = 'page';
  }

  updated(changedProperties) {
    if (!changedProperties) return;

    if (changedProperties.has('selected')) {
      if (this.selected === changedProperties.get('selected')) return;

      const { page, element } = this._query(this.selected, this.fallback);

      if (element) {
        const event = new CustomEvent('load', {
          detail: page
        });
        this.dispatchEvent(event);

        this.loading = true;
        window.customElements.whenDefined(element.tagName.toLowerCase()).then(() => {
          const previouslySelected = this.querySelector('[selected]');

          const promises = [];
          if (previouslySelected) {
            if (!previouslySelected.hide) {
              previouslySelected.hide = this.hide.bind(previouslySelected);
            }

            promises.push(Promise.resolve(previouslySelected.hide()).then(() => {
              previouslySelected.removeAttribute('selected');
            }));
          }

          return Promise.all(promises).then(() => {
            element.setAttribute('selected', '');

            const promises = [];
            if (element) {
              if (!element.show) {
                element.show = this.show.bind(element);
              }

              promises.push(Promise.resolve(element.show(!!previouslySelected)));
            }

            return Promise.all(promises);
          });
        }).finally(() => {
          this.loading = false;
        });
      } else {
        console.warn(`Unable to find the given page. (${this.selected})`);
      }
    }
  }

  _query(page, fallback) {
    const element = this.querySelector(`[${this.attribute}=${page}]`);

    if (element) {
      return { page, element };
    }

    if (fallback) {
      return this._query(fallback);
    }

    return null;
  }

  show(animate) {
    if (animate) {
      return this.animate([
        { opacity: 0 },
        { opacity: 1 }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).finished;
    }
  }

  hide() {
    return this.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    }).finished.then((animation) => {
      animation.cancel();
    });
  }
}

export default Pages;
