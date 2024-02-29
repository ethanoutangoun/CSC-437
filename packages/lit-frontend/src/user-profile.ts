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

  editName: boolean = false;
  editUsername: boolean = false;
  editEmail: boolean = false;
  editPhone: boolean = false;
  editPicture: boolean = false;

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
              <h4 @click="${() => this.toggleEditMode(0)}">Edit</h4>
            </div>
            <div class="pi-content">
              ${this.editName
                ? html`<input
                    class="edit-input"
                    type="text"
                    value="${this.profile?.name}"
                    @change="${(event: KeyboardEvent) =>
                      this.handleFormChange(0, event)}"
                  />`
                : html`<p>${this.profile?.name}</p>`}
            </div>
          </div>

          <div class="pi-block">
            <div class="pi-header">
              <h5>Username</h5>
              <h4 @click="${() => this.toggleEditMode(1)}">Edit</h4>
            </div>
            <div class="pi-content">
              ${this.editUsername
                ? html`<input
                    class="edit-input"
                    type="text"
                    value="${this.profile?.userid}"
                    @change="${(event: KeyboardEvent) =>
                      this.handleFormChange(1, event)}"
                  />`
                : html`<p>${this.profile?.userid}</p>`}
            </div>
          </div>

          <div class="pi-block">
            <div class="pi-header">
              <h5>Email Address</h5>
              <h4 @click="${() => this.toggleEditMode(2)}">Edit</h4>
            </div>
            <div class="pi-content">
              ${this.editEmail
                ? html`<input
                    class="edit-input"
                    type="text"
                    value="${this.profile?.email}"
                    @change="${(event: KeyboardEvent) =>
                      this.handleFormChange(2, event)}"
                  />`
                : html`<p>${this.profile?.email}</p>`}
            </div>
          </div>

          <div class="pi-block">
            <div class="pi-header">
              <h5>Phone Number</h5>
              <h4 @click="${() => this.toggleEditMode(3)}">Edit</h4>
            </div>
            <div class="pi-content">
              ${this.editPhone
                ? html`<input
                    class="edit-input"
                    type="text"
                    value="${this.profile?.phone}"
                    @change="${(event: KeyboardEvent) =>
                      this.handleFormChange(3, event)}"
                  />`
                : html`<p>
                    ${this.profile?.phone == null || this.profile.phone === ""
                      ? "Add Phone"
                      : this.profile.phone}
                  </p>`}
            </div>
          </div>
        </div>

        <div class="pi-img">
          ${this.profile?.picture
            ? html`<img
                src="${this.profile?.picture}"
                alt="Profile"
                draggable="false"
                @click="${() => this.toggleEditMode(4)}"
              />`
            : html` <img
                src="/images/empty-pfp.png"
                alt="Profile"
                draggable="false"
                @click="${() => this.toggleEditMode(4)}"
              />`}

          <p @click="${() => this.toggleEditMode(4)}">Replace</p>
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

    .edit-input {
      margin-top: 10px;
      padding: 5px;
    }

    .profile-content {
      margin-top: 100px;
      margin-left: 80px;
      margin-right: 80px;
      padding-bottom: 80px;
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

  toggleEditMode(index: number) {
    // set all except to current index to false initially
    if (index === 0) {
      this.editUsername = false;
      this.editEmail = false;
      this.editPhone = false;
      this.editPicture = false;
    }

    if (index === 1) {
      this.editName = false;
      this.editEmail = false;
      this.editPhone = false;
      this.editPicture = false;
    }

    if (index === 2) {
      this.editName = false;
      this.editUsername = false;
      this.editPhone = false;
      this.editPicture = false;
    }

    if (index === 3) {
      this.editName = false;
      this.editUsername = false;
      this.editEmail = false;
      this.editPicture = false;
    }

    // Open the file upload dialog when the picture is clicked, and close the edit mode
    if (index === 4) {
      // Open the file upload dialog
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.accept = "image/*"; // Allow only image files
      inputElement.addEventListener("change", (event: Event) => {
        const file = (event.target as HTMLInputElement).files![0];
        if (file) {
          // Handle the selected file, e.g., upload it or display preview
          console.log("Selected file:", file);
        }
      });
      inputElement.click();
    }

    // 0 for profile, 1 for username, 2 for email, 3 for phone, 4 for picture
    if (index === 0) {
      this.editName = !this.editName;
    } else if (index === 1) {
      this.editUsername = !this.editUsername;
    } else if (index === 2) {
      this.editEmail = !this.editEmail;
    } else if (index === 3) {
      this.editPhone = !this.editPhone;
    } else if (index === 4) {
      this.editPicture = !this.editPicture;
    }

    // Update the UI
    this.requestUpdate();
  }

  // Create function to create JSON object and send to server
  updateProfile() {
    const profileData = {
      name: this.profile?.name,
      userid: this.profile?.userid,
      email: this.profile?.email,
      phone: this.profile?.phone,
    };

    fetch(serverPath(this.path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        if (json) {
          this.profile = json as Profile;
        }
      });
  }

  handleFormChange(index: number, event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    // console.log(newValue);

    if (index === 0) {
      this.profile!.name = newValue;
    }

    if (index === 1) {
      this.profile!.userid = newValue;
    }

    if (index === 2) {
      this.profile!.email = newValue;
    }

    if (index === 3) {
      this.profile!.phone = newValue;
    }

    this.updateProfile();
    this.toggleEditMode(index);
    alert("Username changed");
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
