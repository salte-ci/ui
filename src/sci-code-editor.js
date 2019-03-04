import { LitElement, html, css, customElement } from 'lit-element';

import hljs from 'highlight.js/lib/highlight';
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('yaml', yaml);

@customElement('sci-code-editor')
class CodeEditor extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
      }

      pre {
        margin: 0;
        padding: 0;
      }

      /* HighlightJS Tomorrow Night */
      .hljs{display:block;overflow-x:auto;padding:.5em;background:#1E1E1E;color:#DCDCDC}.hljs-addition,.hljs-deletion{display:inline-block;width:100%}.hljs-keyword,.hljs-link,.hljs-literal,.hljs-name,.hljs-symbol{color:#569CD6}.hljs-link{text-decoration:underline}.hljs-built_in,.hljs-type{color:#4EC9B0}.hljs-class,.hljs-number{color:#B8D7A3}.hljs-meta-string,.hljs-string{color:#D69D85}.hljs-regexp,.hljs-template-tag{color:#9A5334}.hljs-formula,.hljs-function,.hljs-params,.hljs-subst,.hljs-title{color:#DCDCDC}.hljs-comment,.hljs-quote{color:#57A64A;font-style:italic}.hljs-doctag{color:#608B4E}.hljs-meta,.hljs-meta-keyword,.hljs-tag{color:#9B9B9B}.hljs-template-variable,.hljs-variable{color:#BD63C5}.hljs-attr,.hljs-attribute,.hljs-builtin-name{color:#9CDCFE}.hljs-section{color:gold}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-bullet,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-selector-tag{color:#D7BA7D}.hljs-addition{background-color:#144212}.hljs-deletion{background-color:#600}

      #content {
        background: none;
        padding: 0;
      }

      #editor {
        background: transparent;
        border: none;
        resize: none;
        position: absolute;
        top: 0;
        bottom: 0;
        width: calc(100% - 30px);
        line-height: 19.5px;
        font-size: 13px;
        font-family: monospace;
        overflow: hidden;
        color: transparent;
        caret-color: white;
        outline: none;
      }
    `;
  }

  render() {
    return html`
      ${this.readOnly ? '' : html`
        <textarea id="editor"
          .value="${this.code}"
          spellcheck="false"
          @input="${({ target }) => this.code = target.value}">
        </textarea>
      `}
      <pre><code id="content" class="hljs"></code></pre>
    `;
  }

  static get properties() {
    return {
      code: String,

      readOnly: {
        type: Boolean,
        reflect: true,
        attribute: 'read-only'
      }
    }
  }

  constructor() {
    super();

    this._updateMarkdown = this._updateMarkdown.bind(this);
  }

  updated(changedProperties) {
    if (changedProperties.has('code')) {
      this.content.innerHTML = hljs.highlightAuto(this.code || '').value;
    }
  }

  get content() {
    if (!this._content) {
      this._content = this.shadowRoot.getElementById('content');
    }

    return this._content;
  }

  _updateMarkdown() {
    this.content.innerHTML = this.converter.makeHtml('```yml\n' + this.content.innerText + '\n```');
  }
}

export default CodeEditor;
