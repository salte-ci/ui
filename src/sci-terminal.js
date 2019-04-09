import { LitElement, html, css, customElement } from 'lit-element';

import { Converter } from 'showdown';
import highlight from 'showdown-highlight';

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

      #markdown {
        background: #1B1D23;
        padding: 10px;
        border-bottom-right-radius: inherit;
        border-bottom-left-radius: inherit;
      }

      pre {
        margin: 0;
        padding: 0;
      }

      /* HighlightJS Tomorrow Night */
      .hljs{display:block;overflow-x:auto;padding:.5em;background:#1E1E1E;color:#DCDCDC}.hljs-addition,.hljs-deletion{display:inline-block;width:100%}.hljs-keyword,.hljs-link,.hljs-literal,.hljs-name,.hljs-symbol{color:#569CD6}.hljs-link{text-decoration:underline}.hljs-built_in,.hljs-type{color:#4EC9B0}.hljs-class,.hljs-number{color:#B8D7A3}.hljs-meta-string,.hljs-string{color:#D69D85}.hljs-regexp,.hljs-template-tag{color:#9A5334}.hljs-formula,.hljs-function,.hljs-params,.hljs-subst,.hljs-title{color:#DCDCDC}.hljs-comment,.hljs-quote{color:#57A64A;font-style:italic}.hljs-doctag{color:#608B4E}.hljs-meta,.hljs-meta-keyword,.hljs-tag{color:#9B9B9B}.hljs-template-variable,.hljs-variable{color:#BD63C5}.hljs-attr,.hljs-attribute,.hljs-builtin-name{color:#9CDCFE}.hljs-section{color:gold}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-bullet,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-selector-tag{color:#D7BA7D}.hljs-addition{background-color:#144212}.hljs-deletion{background-color:#600}

      .hljs {
        background: none;
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

      <div id="markdown"></div>
    `;
  }

  static get properties() {
    return {
      menu: {
        type: Boolean,
        reflect: true
      },

      markdown: String
    }
  }

  updated(changedProperties) {
    if (changedProperties) {
      if (changedProperties.has('markdown')) {
        const markdown = this.shadowRoot.getElementById('markdown');

        markdown.innerHTML = this.markdown ? this.converter.makeHtml(this.markdown) : '';
      }
    }
  }

  get converter() {
    if (!this._converter) {
      this._converter = new Converter({
        ghCompatibleHeaderId: true,
        simplifiedAutoLink: true,
        tables: true,
        extensions: [highlight]
      });
    }

    return this._converter;
  }
}

export default Terminal;
