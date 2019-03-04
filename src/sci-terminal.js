import { LitElement, html, css, customElement } from 'lit-element';

import hljs from 'highlight.js/lib/highlight';
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('yaml', yaml);

@customElement('sci-terminal')
class Terminal extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 600px;
        max-width: 100%;
        border-radius: 6px;
        box-shadow: 0px 0px 20px #acacac;
      }

      .minimize,
      .zoom,
      .close {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        border: 1px solid #000;
        position: relative;
        top: 6px;
        display: inline-block;
      }

      .close {
        left: 6px;
        background-color: #ff5c5c;
        border-color: #e33e41;
      }

      .minimize {
        left: 11px;
        background-color: #ffbd4c;
        border-color: #e09e3e;
      }

      .zoom {
        left: 16px;
        background-color: #00ca56;
        border-color: #14ae46;
      }

      .fake-menu {
        display: flex;
        box-sizing: border-box;
        height: 25px;
        border-top-right-radius: inherit;
        border-top-left-radius: inherit;
        background-color: #ebebeb;
        background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
        background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);
        background: -ms-linear-gradient(top, #ebebeb, #d5d5d5);
        background: -o-linear-gradient(top, #ebebeb, #d5d5d5);
        background: linear-gradient(top, #ebebeb, #d5d5d5);
      }

      #terminal {
        background: #1B1D23;
        color: white;
        border-bottom-right-radius: inherit;
        border-bottom-left-radius: inherit;
        padding: 15px;
        font-family: monospace;
      }

      .no-menu {
        border-top-right-radius: inherit;
        border-top-left-radius: inherit;
      }
    `;
  }

  render() {
    return html`
      ${this.menu ? html`
        <div class="fake-menu">
          <div class="close"></div>
          <div class="minimize"></div>
          <div class="zoom"></div>
        </div>
      ` : ''}

      <div id="terminal" class="${this.menu ? '' : 'no-menu'}">
        <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      menu: {
        type: Boolean,
        reflect: true
      }
    }
  }
}

export default Terminal;
