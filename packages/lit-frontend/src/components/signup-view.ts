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
    return html`<div class="login-content">
      <div class="image-display">
        <img src="/images/chef-avatar.png" alt="food" />
      </div>

      <div class="login-form">
        <div class="align">
          <p class="back" @click=${() => Router.go("/app/")}><- Back to Home</p>
          <h1>Sign Up</h1>

          <form @submit=${this.handleSubmit}>
            <input
              type="text"
              .value=${this.username}
              @input=${this.handleUsernameChange}
              placeholder="Username"
              required
            />
            <input
              type="password"
              .value=${this.password}
              @input=${this.handlePasswordChange}
              placeholder="Password"
              required
            />
            <button type="submit">Sign In</button>
          </form>

          <div class="register-link">
            <p>Already have an account?</p>
            <p @click=${() => Router.go("/app/login")}>Log In↗</p>
          </div>
        </div>
      </div>
    </div> `;
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
    }).then((response) => {
      if (response.status === 201) {
        // Redirect to the home page
        Router.go("/app/login");
        return response.json();
      } else {
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

  static styles = css`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
      box-sizing: border-box;
    }

    h1 {
      color: var(--color-primary);
      font-size: 2rem;
    }

    .back {
      font-size: 0.8rem;
      color: var(--color-primary);
      cursor: pointer;
    }

    .fail {
      font-size: 0.8rem;

      color: red;
    }

    .login-content {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 3fr;
      z-index: 100;
      align-items: stretch;
      height: 100vh;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    form input {
      width: 400px;
      height: 50px;
      padding: 10px;
      border: none;
      background-color: var(--color-login-input-bg);
      border-radius: 10px;
    }

    form button {
      width: 400px;
      height: 50px;
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: var(--color-login-button-bg);
      color: white;
    }

    .login-form {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .align {
      height: 100%;
      display: flex;
      gap: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    .image-display {
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .image-display img {
      width: 600px;
      height: auto;
      object-fit: cover;
      transform: translateX(100px);
    }

    .register-link {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary);
      gap: 5px;
    }

    .register-link p:last-child {
      font-weight: 500;
    }

    .register-link p:last-child:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    @media (max-width: 1283px) {
      .image-display img {
        height: 0;
        display: none;
      }

      .login-content {
        grid-template-columns: 1fr;
      }

      .login-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .login-form {
        padding: 100px;
      }

      form button {
        width: 350px;
      }

      form input {
        width: 350px;

      }
    }
  `;
}
