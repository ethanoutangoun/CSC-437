import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./toggle-switch.ts";

@customElement("drop-down")
class DropDownElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  render() {
    return html`
      <input
        type="checkbox"
        id="is-shown"
        @change=${this._handleChange}
        .checked=${this.open}
      />
      <label for="is-shown">
        <div class="navbar-menu">
          <img id="menu" src="/images/menu.png" alt="menu" width="20px" />
          <img src="/images/avatar.png" alt="Profile" width="40px" />
        </div>
      </label>

      <slot name="menu">
        <ul>
          
          <li class="command"><a href="account.html">Account</a></li>
          <li class="command">
            <a href="profile.html">Profile</a>
          </li>

          <li class="command"><a href="settings.html">Settings</a></li>

          <li class="command"><a href="index.html">Logout</a></li>
        </ul>
      </slot>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
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
      right: 0;
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
      padding: 5px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 20px;
    }

    a {
      color: var(--color-dark);
      padding: 10px;
      padding-left: 20px;
      width: 180px;
      text-decoration: none;
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
