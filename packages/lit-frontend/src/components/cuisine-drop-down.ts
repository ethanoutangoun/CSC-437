import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./toggle-switch.ts";

@customElement("cuisine-drop-down")
export class CuisineDropDownElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @state()
  cuisine: string | null = null;

  _selectCuisine(cuisine: string) {
    this.cuisine = cuisine;
    this.dispatchEvent(
      new CustomEvent("cuisine-selected", { detail: cuisine })
    );
  }

  render() {
    return html`
      <div class="all">
        <input
          type="checkbox"
          id="is-shown"
          @change=${this._handleChange}
          .checked=${this.open}
        />
        <label for="is-shown">
          <div class="navbar-menu">
            <h5>${this.cuisine ? this.cuisine : html`Select Cuisine`}</h5>
          </div>
        </label>

        <slot name="menu">
          <ul>
            <li class="command">
              <p
                @click=${() => {
                  this._toggle(false);
                  this._selectCuisine("American");
                }}
              >
                American
              </p>
            </li>

            <li class="command">
              <p
                @click=${() => {
                  this._toggle(false);
                  this._selectCuisine("Italian");
                }}
              >
                Italian
              </p>
            </li>

            <li class="command">
              <p
                @click=${() => {
                  this._toggle(false);
                  this._selectCuisine("Mexican");
                }}
              >
                Mexican
              </p>
            </li>

            <li class="command">
              <p
                @click=${() => {
                  this._toggle(false);
                  this._selectCuisine("Japanese");
                }}
              >
                Japanese
              </p>
            </li>

            <li class="command">
              <p
                @click=${() => {
                  this._toggle(false);
                  this._selectCuisine("Chinese");
                }}
              >
                Chinese
              </p>
            </li>

            <li class="command">
              <p
                @click=${() => {
                  this._toggle(false);
                  this._selectCuisine("Indian");
                }}
              >
                Indian
              </p>
            </li>

            <li class="command">
              <p
                @click=${() => {
                  this._toggle(false);
                  this._selectCuisine("French");
                }}
              >
                French
              </p>
            </li>
          </ul>
        </slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
    }

    .navbar-menu h5 {
      font-size: 15px;
      font-weight: 500;
      color: var(--color-primary);
    }

    svg.icon {
      width: 30px;
      height: 30px;
      stroke: var(--color-primary);
      background-color: inherit;
      fill: none;
      fill-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.7;
      transform: translate(6px, 0);
    }

    #is-shown {
      display: none;
    }

    label {
      cursor: pointer;
    }

    slot[name="menu"] {
      display: none;
      position: absolute;
      top: 110%;
      left: 0;
      border-radius: 10px;
      // padding: 15px;
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
      background: white;
    }

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }
    m
    /* CSS for slotted elements and default slot content */

    ::slotted(ul[slot="menu"]),
    slot[name="menu"] > ul {
      margin: 0;
      padding: 0;
      margin-top: 6px;
      margin-bottom: 6px;
      list-style: none;
      white-space: nowrap;
    }

    .command {
      display: flex;
    }

    .command:hover {
      cursor: pointer;
      background-color: var(--color-light);
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 20px;
      border: 1px solid var(--color-light);
      padding: 10px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 5px;
      background-color: inherit;
    }

    p {
      color: var(--color-dark);
      padding: 10px;
      padding-left: 20px;
      width: 180px;
      text-decoration: none;
    }

    .all {
      background-color: inherit;
    }

    .switch {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border-bottom: 1px solid var(--color-light);
    }
  `;

  _handleChange(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    this._toggle(target?.checked);
  }

  _toggle(open: any) {
    this.open = open;
    this._toggleClickAway(open);
  }

  _toggleClickAway(open: any) {
    const clickawayHandler = (ev: any) => {
      if (!ev.composedPath().includes(this)) {
        this._toggle(false);
      } else {
        ev.stopPropagation();
      }
    };

    if (open) {
      document.addEventListener("click", clickawayHandler);
    } else {
      document.removeEventListener("click", clickawayHandler);
    }
  }
}
