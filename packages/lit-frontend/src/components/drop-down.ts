import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Router } from "@vaadin/router";
import "./toggle-switch.ts";
import { APIUser, AuthenticatedUser } from "./rest";

@customElement("drop-down")
export class DropDownElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @state()
  user: APIUser = AuthenticatedUser.authenticateFromLocalStorage(() =>
    this._signOut()
  );

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
            <svg class="icon">
              <use href="/icons/menu.svg#icon-menu"></use>
            </svg>
            <img src="/images/avatar.png" alt="Profile" width="40px" />
          </div>
        </label>

        <slot name="menu">
          <ul>
            <li class="switch"><toggle-switch></toggle-switch></li>
            ${this.user.authenticated
              ? html`<li class="command">
            
            <p @click = ${() => {
              this._toggle(false);
              Router.go("/app/account");
            }}>Account</a>
              </li>`
              : html``}
            ${this.user.authenticated
              ? html`<li class="command">
                  <p
                    @click=${() => {
                      this._toggle(false);

                      Router.go("/app/profile/" + this.user.username);
                    }}
                  >
                    Profile
                  </p>
                </li>`
              : html``}
            ${this.user.authenticated
              ? html`<li class="command">
                  <p
                    @click=${() => {
                      this._toggle(false);
                      Router.go("/app/settings");
                    }}
                  >
                    Settings
                  </p>
                </li>`
              : html``}
            ${!this.user.authenticated
              ? html`<li
                  class="command"
                  @click=${() => {
                    this._toggle(false);
                    Router.go("/app/signup");
                  }}
                >
                  <p>Signup</p>
                </li> `
              : html``}
            ${!this.user.authenticated
              ? html`<li
                  class="command"
                  @click=${() => {
                    this._toggle(false);
                    Router.go("/app/login");
                  }}
                >
                  <p>Login</p>
                </li>`
              : html``}
            ${this.user.authenticated
              ? html`<li
                  class="command"
                  @click=${() => {
                    this._signOut();
                    this._toggle(false);
                  }}
                >
                  <p>Logout</p>
                </li>`
              : html``}
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

  _signOut() {
    const TOKEN_KEY = "JWT_AUTH_TOKEN";
    console.log("Signing out");
    localStorage.removeItem(TOKEN_KEY);
    this.user = APIUser.deauthenticate(this.user);

    window.location.href = "/app/";
  }

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
