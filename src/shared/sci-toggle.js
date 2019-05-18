import { LitElement, html, css, customElement } from 'lit-element';

@customElement('sci-toggle')
export class Toggle extends LitElement {
    static get styles() {
        return css`

        :host([checked]) .line
        {
            background: var(--app-success-color);
        }

        :host([checked])
        {
            background: var(--app-success-color);

        }

        :host([checked]) .thumbnail
        {
            right: -1px;
        }

        .line 
        {
            height: 2px;
            border-radius: 1px;
            display: flex;
            background: var(--app-accent-color);
            transition: 0.15s ease-in-out;
            transition-property: background-color;

        }

        .thumbnail
        {
            position: absolute;
            top: 0;
            bottom: 2px;
            width: 25px;
            background: var(--app-secondary-color);
            border-radius: inherit;
            box-shadow:
            0 2px 0 var(--app-darken-color),
            0 2px 0 var(--app-secondary-color);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 7px 5px;
            box-sizing: border-box;
            right: calc(100% - 24px);
            transition: 0.15s ease-in-out;
            transition-property: right;


        }
        :host
        {
            display: inline-block;
            position: relative;
            background: var(--app-accent-color);
            border-radius: 6px;
            width: 40px;
            height: 32px;
            cursor: pointer;
            transition: 0.15s ease-in-out;
            transition-property: background-color;
            box-shadow: inset 0 2px 0px 0px var(--app-darken-color);
            outline: none;
        }
        `
    }

    render() {
        return html`
        <div class="thumbnail">
            <div class='line'>
            </div>
            <div class='line'>
            </div>
            <div class='line'>
            </div>
        </div>
        `;
    }
    constructor() {
        super();
        this.setAttribute('role', 'checkbox');
        this.setAttribute('tabindex', '0');
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', () => {
            this.checked = !this.checked;
            this.dispatchEvent(new CustomEvent('change', {
                detail: this.checked
            }))

        });
    }

    static get properties() {
        return {
            checked: { type: Boolean, reflect: true }

        }
    }
}