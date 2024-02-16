import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./models/profile";
import { serverPath } from "./rest";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;
  editMode: boolean = false;

  render() {
    // fill this in later
    return html` <div class="profile-content">
      <div class="profile-header">
        <h4>Account > Personal Info</h4>
        <h2>Personal Info</h2>
      </div>

      <div class="pi-all">
        <div class="pi-container">
          <div class="pi-block">
            <div class="pi-header">
              <h5>Full Name</h5>
              <h4>Edit</h4>
            </div>
            <div class="pi-content">
              <p>${this.profile?.name}</p>
            </div>
          </div>

          <div class="pi-block">
            <div class="pi-header">
              <h5>Username</h5>
              <h4 @click="${this.toggleEditMode}">Edit</h4>
            </div>
            <div class="pi-content">
              ${this.editMode
                ? html`<input
                    type="text"
                    value="${this.profile?.userid}"
                    @change="${this.handleUsernameChange}"
                  />`
                : html`<p>${this.profile?.userid}</p>`}
            </div>
          </div>

          <div class="pi-block">
            <div class="pi-header">
              <h5>Email Address</h5>
              <h4>Edit</h4>
            </div>
            <div class="pi-content">
              <p>${this.profile?.email}</p>
            </div>
          </div>

          <div class="pi-block">
            <div class="pi-header">
              <h5>Phone Number</h5>
              <h4>Edit</h4>
            </div>
            <div class="pi-content">
              <p>
                ${this.profile?.phone ? this.profile.phone : html`Add Number`}
              </p>
            </div>
          </div>
        </div>

        <div class="pi-img">
          ${this.profile?.picture
            ? html`<img
                src="${this.profile?.picture}"
                alt="Profile"
                draggable="false"
              />`
            : html` <img
                src="/images/dude.jpg"
                alt="Profile"
                draggable="false"
              />`}

          <p>Replace</p>
        </div>
      </div>
    </div>`;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .profile-content {
      margin-top: 100px;
      margin-left: 80px;
      margin-right: 80px;
    }

    .profile-header {
      margin-top: 120px;
      color: var(--color-primary);
    }

    .profile-tabs {
      margin-top: 40px;
      display: grid;

      grid-template-columns: 1fr 1fr 1fr;

      gap: 20px;
    }

    .profile-tabs a {
      /*add drop shadow */
      box-shadow: 0px 5px 5px var(--color-card-highlight);
      padding: 20px;
      text-decoration: none;
      background-color: var(--color-card-bg);
    }

    .profile-tabs h3 {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      background-color: inherit;
    }

    .profile-tabs p {
      margin-top: 15px;
      font-size: 14px;
      font-weight: 300;
      color: var(--color-light-alt);
      background-color: inherit;
    }

    .profile-tabs img {
      width: 40px;
      margin-bottom: 10px;
      background-color: inherit;
    }

    @media screen and (max-width: 988px) {
      .profile-tabs {
        grid-template-columns: 1fr;
      }
      .profile-content {
        margin: 0;
      }
    }

    .profile-header h4 {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 20px;
    }

    .pi-all {
      display: grid;
      margin-top: 60px;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .pi-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .pi-header h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary);
      text-decoration: underline;
    }

    .pi-header h4:hover {
      cursor: pointer;
    }

    .pi-header h5 {
      font-size: 16px;
      font-weight: 400;
      color: var(--color-primary);
    }

    .pi-content p {
      margin-top: 7px;
      font-size: 15px;
      font-weight: 300;
      color: var(--color-light-alt);
    }

    .pi-block {
      border-bottom: 1px solid var(--color-light);
      padding: 20px 0px 20px 0px;
    }

    .pi-img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
    }

    .pi-img p {
      text-decoration: underline;
      color: var(--color-primary);
    }

    .pi-img p:hover {
      cursor: pointer;
    }

    .pi-img img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 100%;
    }

    .pi-img img:hover {
      cursor: pointer;
      opacity: 70%;
    }

    @media screen and (max-width: 988px) {
      .pi-all {
        grid-template-columns: 1fr;
        gap: 50px;

        /* reverse direction for grid*/
        grid-template-rows: 1fr 1fr;
      }

      .pi-img {
        grid-row: 1;
        grid-column: 1;
      }
    }
  `;

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.requestUpdate();
  }

  handleUsernameChange() {
    this.toggleEditMode();
    // alert("Username changed");
  }

  _fetchData(path: string) {
    fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      });
  }

  //   When the element is connected to the DOM, it fetches the data from the server.
  connectedCallback() {
    if (this.path) {
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "path" && oldValue !== newValue && oldValue) {
      this._fetchData(newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
}

@customElement("user-profile-edit")
export class UserProfileEditElement extends UserProfileElement {
  render() {
    return html`
 
        <form @submit=${this._handleSubmit}>
          <h3>Edit Profile</h3>
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            .value=${this.profile?.name ?? ""}
          />

          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            .value=${this.profile?.userid ?? ""}
          />

          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            .value=${this.profile?.email ?? ""}
          />

          <label for="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            .value=${this.profile?.phone ?? ""}
          />

          <button type="submit">Submit</button>
        </form>

    `;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    form {
      display: grid;
      gap: 20px;
      margin-top: 100px;
      margin-left: 80px;
      margin-right: 80px;
      margin-bottom: 80px;
      border-top: 1px solid var(--color-light);
      padding-top: 20px;
    }

    label {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary);
    }

    input {
      padding: 10px;
      font-size: 16px;
      font-weight: 300;
      color: var(--color-light-alt);
      border: 1px solid var(--color-light);
    }

    button {
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      background-color: var(--color-primary-orange);
      border: none;
    }

    button:hover {
      cursor: pointer;
    }
  `;

  _handleSubmit(ev: Event) {
    ev.preventDefault(); // prevent browser from submitting form data itself

    const target = ev.target as HTMLFormElement;
    const formdata = new FormData(target);
    const entries = Array.from(formdata.entries())
      .map(([k, v]) => (v === "" ? [k] : [k, v]))
      .map(([k, v]) =>
        k === "airports"
          ? [k, (v as string).split(",").map((s) => s.trim())]
          : [k, v]
      );
    const json = Object.fromEntries(entries);
    console.log(json);

    this._putData(json);
  }

  _putData(json: Profile) {
    fetch(serverPath(this.path), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return null;
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      })
      .catch((err) => console.log("Failed to PUT form data", err));
  }
}
