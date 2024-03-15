import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "../models/profile";
import { serverPath } from "./rest";
import { APIUser, APIRequest, JSONRequest } from "./rest";
import "./auth-required";
import { consume } from "@lit/context";
import { authContext } from "./auth-required";


// import RouterLocation
import { Router, RouterLocation } from "@vaadin/router";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property({ attribute: false })
  location: RouterLocation | undefined;

  @property()
  path: string = "";

  @state()
  profile?: Profile;

  @consume({ context: authContext, subscribe: true })
  @property({ attribute: false })
  user?: APIUser;

  @state()
  avatar?: string;

  // state saves for if picture upload fails
  @state()
  oldPicture?: string;

  @state()
  pictureUploadFailed: boolean = false;
  errorMessage: string = "";

  editName: boolean = false;
  editUsername: boolean = false;
  editEmail: boolean = false;
  editPhone: boolean = false;
  editPicture: boolean = false;

  render() {
    // fill this in later

    return html`
      <div class="profile-content">
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
                <h4 @click="${() => console.log(window.location.origin)}">
                  Edit
                </h4>
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

            <p class = "upload" @click="${() => this.toggleEditMode(4)}">Replace</p>

            ${this.pictureUploadFailed
              ? html`<p class="error">Upload failed: ${this.errorMessage}</p>`
              : html``}
          </div>
        </div>
      </div>
    `;
  }

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
      this.oldPicture = this.profile?.picture;

      // Open the file upload dialog
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.accept = "image/*"; // Allow only image files
      inputElement.addEventListener("change", (event: Event) => {
        const target = event.target as HTMLInputElement;
        const selectedFile = (target.files as FileList)[0];

        const reader: Promise<string> = new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(fr.result as string);
          fr.onerror = (err) => reject(err);
          fr.readAsDataURL(selectedFile);
        });

        reader.then((result: string) => {
          this.avatar = result;
          this.profile!.picture = result;
          this.updateProfile();
        });
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
    let profileData = {};

    if (this.avatar !== undefined) {
      profileData = {
        name: this.profile?.name,
        userid: this.profile?.userid,
        email: this.profile?.email,
        phone: this.profile?.phone,
        picture: this.profile?.picture,
      };
    }
    else
    {
      profileData = {
        name: this.profile?.name,
        userid: this.profile?.userid,
        email: this.profile?.email,
        phone: this.profile?.phone,
      };
    }

    const request = new JSONRequest(profileData);

    request
      .put(this.path)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        if (json) {
          console.log("PUT request successful:", json);
          this.profile = json as Profile;
          this.pictureUploadFailed = false;
          this.errorMessage = "";
        }
      })
      .catch((err) => {
        // set old picture back if request fails
        this.profile!.picture = this.oldPicture ?? "";
        this.requestUpdate();
        this.pictureUploadFailed = true;
        this.errorMessage = err;

        setTimeout(() => {
          this.pictureUploadFailed = false;
          this.errorMessage = "";
        }, 3000);

        console.log("Failed to POST form data", err);
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

    if (index === 0) {
      alert("Name changed");
    }

    if (index === 1) {
      alert("User id changed");
    }

    if (index === 2) {
      alert("Email changed");
    }

    if (index === 3) {
      alert("Phone number changed");
    }
  }

  _fetchData(path: string) {
    fetch(serverPath(path), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        console.log("Error fetching data", response);
        return null;
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }

  _getData(path: string) {
    const request = new APIRequest();

    request
      .get(path)
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        this.profile = json as Profile;
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }

  async connectedCallback() {
    super.connectedCallback();
    this.requestUpdate();
    // Wait until the user property is not null
    await new Promise<void>((resolve) => {
      const checkUserNotNull = () => {
        if (this.user !== undefined && this.user !== null) {
          resolve(); // No value needs to be passed
        } else {
          setTimeout(checkUserNotNull, 100); // Check user property every 100 milliseconds
        }
      };
      checkUserNotNull();
    });

    // After user becomes non-null, continue with data fetching
    if (this.user && this.user.authenticated === false) {
      // User is not authenticated, redirect to the login page or another page
      console.log(this.user);
      Router.go("/app/login"); // Redirect to the login page
      return; // Stop further execution of the callback
    }

    

    if (this.location) {
      const pathnameParts = this.location.pathname.split("/");
      const useridIndex = pathnameParts.indexOf("profile") + 1; // Get the index of the next segment after 'profile'
      const userid = pathnameParts[useridIndex];

      // protected routes from viewing other profiles
      if (userid !== this.user?.username) { 
        Router.go('/app/')
      }

      this.path = `/profiles/${userid}`;
    }

    if (this.path) {
      console.log("Fetching data from", this.path);
      this._getData(this.path);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "path" && oldValue !== newValue && oldValue) {
      this._getData(newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
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

    .upload {
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

    .error{
      color: red;
      text-decoration: none;
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
}
