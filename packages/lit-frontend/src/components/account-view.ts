import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@vaadin/router";

import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

@customElement("account-view")
export class AccountView extends LitElement {
  render() {
    return html`
      <div class="profile-content">
        <div class="profile-header">
          <h2>Account</h2>
          <p>
            Ethan Outangoun, ethanoutangoun@gmail.com · Go to
            <a href="public-profile.html">profile</a>
          </p>
        </div>

        <div class="profile-tabs">
          <div @click=${() => Router.go("/app/profile/ethanoutangoun")}>
            <img src="/icons/profile.svg" alt="profile-icon" />
            <h3>Personal Info</h3>
            <p>Personal Details and Account information</p>
          </div>
          <div @click=${() => Router.go("/app/groups")}>
            <img src="/images/groups.png" alt="groups-icon" />
            <h3>Groups</h3>
            <p>Find and create groups</p>
          </div>
          <div @click=${() => Router.go("/app/my-recipes")}>
            <img src="/icons/notes.svg" alt="recipe-icon" />
            <h3>My Recipes</h3>
            <p>View your recipes of your own creation</p>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS), css`

  .profile-tabs div {
    /*add drop shadow */
    box-shadow: 0px 5px 5px var(--color-card-highlight);
    padding: 20px;
    text-decoration: none;
    background-color: var(--color-card-bg);
  }

  .profile-tabs div:hover { 
    cursor: pointer;
  }
  


  
  
  `];
}
