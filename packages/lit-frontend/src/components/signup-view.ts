import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { serverPath } from "./rest";
import { Router } from "@vaadin/router";

@customElement("signup-view")
export class SignUpView extends LitElement {
  @property()
  path: string = "/signup";

  @property({ reflect: true, type: Boolean })
  password: string = "";

  @property({ reflect: true, type: Boolean })
  username: string = "";

  constructor() {
    super();
    this.username = "";
    this.password = "";
  }

  render() {
    return html`
      <div login-content>
        <div class="login-header">
          <h2>Sign Up</h2>
        </div>

        <div class="login-form">
          <form @submit=${this.handleSubmit}>
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
        </div>
      </div>
    `;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    // Handle form submission here

    console.log("Username:", this.username);

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
      .then((response) => {
        if (response.status === 201) {
        
        // Redirect to the home page
          Router.go("/app/login");
          return response.json();
        }
        else{
          console.log("Error:", response.status);
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

  static styles = css``;
}
