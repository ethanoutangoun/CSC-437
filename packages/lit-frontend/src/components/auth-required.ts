import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createContext, provide } from "@lit/context";
import {
  APIUser,
  AuthenticatedUser,
  FormDataRequest
} from "./rest";


export let authContext = createContext<APIUser>("auth");


@customElement("auth-required")
export class AuthRequiredElement extends LitElement {





  @state()
  loginStatus: number = 0;

  @state()
  registerStatus: number = 0;

  @provide({ context: authContext })
  @state()
  user: APIUser =
    AuthenticatedUser.authenticateFromLocalStorage(() =>
      this._signOut()
    );

    
    








  isAuthenticated() {
    return this.user.authenticated;
  }

 

  render() {
    return html`${html`<slot .user=${this.user}></slot>`}`;
  }

 

  _handleLogin(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const request = new FormDataRequest(data);

    request
      .base()
      .post("/api/login")
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
          this.user = AuthenticatedUser.authenticate(
            json.token,
            () => this._signOut()
          );
    
          this.requestUpdate();
        }
      });
  }

  _handleRegister(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const request = new FormDataRequest(data);

    request
      .base()
      .post("/signup")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.registerStatus = res.status;
        }
      })
      .then((json) => {
        console.log("Registration:", json);
      });
  }


  _signOut() {
    this.user = APIUser.deauthenticate(this.user);
    document.location.reload();
  }
}