import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { serverPath } from "./rest";
import { Router } from "@vaadin/router";
import { APIUser, AuthenticatedUser } from "./rest";

@customElement("login-view")
export class LoginView extends LitElement {
  @state()
  user: APIUser = AuthenticatedUser.authenticateFromLocalStorage(() =>
    this._signOut()
  );

  @property()
  path: string = "/login";

  @property({ reflect: true, type: Boolean })
  password: string = "";

  @property({ reflect: true, type: Boolean })
  username: string = "";

  constructor() {
    super();
    this.username = "";
    this.password = "";
  }

  @state()
  loginStatus: number = 0;

  render() {
    return html`
      <div login-content>
        <div class="login-header">
          <h2>Login</h2>
        </div>

        <div class="login-form">
          <form @submit=${this.handleSubmit} @change=${() => (this.loginStatus = 0)}>
            <input
              type="text"
              .value=${this.username}
              @input=${this.handleUsernameChange}
              required
            />
            <input
              type="password"
              .value=${this.password}
              @input=${this.handlePasswordChange}
              required
            />
            <button type="submit">Submit</button>
          </form>

          <p>${this.loginStatus ? `Login failed: ${this.loginStatus}` : ""}</p>
        </div>
      </div>
    `;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    // Handle form submission here

    // console.log("Username:", this.username);

    fetch(serverPath(this.path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.username,
        pwd: this.password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.loginStatus = res.status;
        }
      })
      .then((json) => {
        if (json) {
          console.log("Authentication:", json.token);
          this.user = AuthenticatedUser.authenticate(json.token, () =>
            this._signOut()
          );

          // Check if there's a redirect parameter in the URL
          const urlParams = new URLSearchParams(window.location.search);
          const redirectRoute = urlParams.get("redirect");

          if (redirectRoute) {
            Router.go(redirectRoute);
          } else {
            window.location.href = "/app/";
          }

          this.requestUpdate();
        }
      });
  }

  handleUsernameChange(event: InputEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.username = inputElement.value;
  }

  handlePasswordChange(event: InputEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.password = inputElement.value;
  }

  _signOut() {
    this.user = APIUser.deauthenticate(this.user);
    document.location.reload();
  }

  static styles = css``;
}
