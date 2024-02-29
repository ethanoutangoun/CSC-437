import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
// import "../styles/tokens.css";
@customElement("toggle-switch")
export class ToggleSwitchElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  on: boolean = false;

  constructor() {
    super();
    // Check local storage for stored mode
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode !== null) {
      this.on = JSON.parse(storedMode);
      if (this.on) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }

  render() {
    return html`<label>
      <slot class="mode">${this.on ? "Dark" : "Light"}</slot>
      <span class="slider">
        <input type="checkbox" .checked=${this.on} @change=${this._handleChange} />
      </span>
    </label>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: var(--size-spacing-medium);
      line-height: 2em;
      gap: 10px;
    }
    .slider {
      display: inline-block;
      border: 1px solid var(--color-border-control);
      border-radius: 0.75em;
      background-color: var(--color-light);
      height: 1.5em;
      width: 2.75em;
      position: relative;
      transition: background-color var(--time-transition-control);
    }
    .slider:has(input:checked) {
      background-color: var(--color-light);
    }
    input {
      appearance: none;
      background-color: var(--color-primary-orange);
      border-radius: 50%;
      width: 1.25em;
      height: 1.25em;
      vertical-align: center;
      position: absolute;
      left: 0;
      transition: left var(--time-transition-control);
    }
    input:checked {
      left: 1.5em;
    }

    .mode {
      color: var(--color-light-alt);
      font-size: 15px;
      font-weight: 300;

    }
  `;

  _handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;
    this.on = target?.checked;

    // Store the mode in local storage
    localStorage.setItem('darkMode', JSON.stringify(this.on));


    if (this.on) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
  }
}
