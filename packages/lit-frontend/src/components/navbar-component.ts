import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Router } from "@vaadin/router";
import { consume } from "@lit/context";
import { authContext } from "./auth-required";
import { APIUser } from "./rest.ts";

import "./drop-down.ts";

@customElement("navbar-component")
export class Navbar extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @consume({ context: authContext, subscribe: true })
  @property({ attribute: false })
  user?: APIUser;

  render() {
    return html`
      <header class="navbar">
        <div class="navbar-content">
          <div class="logo" @click=${() => Router.go("/app/")}>
            <svg class="main-icon">
              <use href="/icons/icon.svg#cooked-logo" />
            </svg>
            <h1>COOKED</h1>
          </div>

          <section class="search-box">
            <form>
              <input
                type="text"
                name="search"
                placeholder="Search for Recipes, Chefs, & More"
              />
            </form>
          </section>

          <div class="right-navbar">
            ${this.user?.authenticated
              ? html`<div
                  class="group-icon"
                  @click=${() => Router.go("/app/create")}
                >
                  <svg class="icon">
                    <use href="/icons/create.svg#create-recipe" />
                  </svg>
                </div>`
              : html``}

            <drop-down></drop-down>
          </div>
        </div>
      </header>
    `;
  }

  static styles = css`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .navbar {
      z-index: 2;
      background-color: var(--color-main-bg);
      padding: 15px 0;
      border-bottom: 1px solid var(--color-border);
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: inherit;
      margin-left: 80px;
      margin-right: 80px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: inherit;
    }

    .logo:hover {
      cursor: pointer;
    }

    .logo h1 {
      font-size: 28px;
      font-weight: 300;
      color: var(--color-primary);
      background-color: inherit;
      text-shadow: 1px 1px 1px var(--color-light);
    }

    .logo img {
      background-color: inherit;
    }

    .navbar-content a {
      text-decoration: none;
    }

    .content {
      margin-top: 93px;
      margin-left: 80px;
      margin-right: 80px;
    }

    .search-box {
      margin-right: 100px;
      background-color: inherit;
    }

    .search-box form {
      background-color: inherit;
    }

    .search-box input {
      width: 100%;
      padding-top: 13px;
      padding-bottom: 13px;
      padding-right: 80px;
      padding-left: 20px;
      background-color: inherit;
      border-radius: 20px;
      border: 1px solid var(--color-light);
      font-size: 16px;
      font-weight: 300;
      color: var(--color-primary);
    }

    .right-navbar {
      display: flex;
      align-items: center;
      gap: 25px;
      background-color: inherit;
    }

    svg.icon {
      width: 40px;
      height: 40px;
      stroke: var(--color-primary);
      stroke-width: 0.8px;
      background-color: inherit;
      fill: none;
      fill-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      transform: translate(3px, 5px);
    }

    svg.icon:hover {
      cursor: pointer;
    }

    svg.main-icon {
      width: 50px;
      height: 50px;
      stroke: var(--color-primary);
      background-color: inherit;
      fill: none;
      fill-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* svg.icon {
    display: inline;
    height: 2em;
    width: 2em;
    vertical-align: top;
    fill: black;
    stroke: black;
  } */

    .right-navbar a {
      background-color: inherit;
    }
    /* On hover, ease in to make bigger */
    .group-icon img {
      transition: transform 0.3s ease;
      background-color: inherit;
    }

    .group-icon img:hover {
      transform: scale(1.15);
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
      background-color: white;
    }

    /* Add box shadow transition */
    .navbar-menu {
      transition: box-shadow 0.3s ease; /* Add a transition for the box-shadow property */
    }

    /*add a drop shadow upon hover, shadow in downward direction*/
    .navbar-menu:hover {
      cursor: pointer;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
    }

    @media screen and (max-width: 800px) {
      .content {
        margin-left: 50px;
        margin-right: 50px;
      }

      .navbar-content {
        margin-left: 50px;
        margin-right: 50px;
      }
    }

    @media screen and (max-width: 500px) {
      .content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .navbar-content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .logo h1 {
        display: none;
      }
    }

    @media screen and (max-width: 988px) {
      .search-box {
        display: none;
      }
    }
  `;
}
