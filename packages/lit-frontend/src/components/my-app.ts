import { Router } from "@vaadin/router";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import "./trending-view";
import "./user-profile";
import "./account-view";
import "./group-view";
import "./user-recipes";
import "./recipe-view";
import "./setting-view";
import "./category-view";
import "./create-view";
import "./public-profile-view";
import "./login-view";
import "./auth-required";
import "./signup-view";
import "./test-component";
import "./navbar-component";

@customElement("my-app")
export class MyApp extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot?.querySelector("#outlet"));

    router.setRoutes([
      {
        path: "/app/profile/:userid",
        component: "user-profile",
      },

      {
        path: "/app/",
        component: "create-view",
        action: () => {
          window.scrollTo(0, 0);
        },
      },

      { path: "/app/account", component: "account-view" },

      { path: "/app/groups", component: "group-view" },

      { path: "/app/my-recipes", component: "user-recipes" },

      {
        path: "/app/recipe/:recipeid",
        component: "recipe-view",
        action: () => {
          window.scrollTo(0, 0);
        },
      },

      { path: "/app/settings", component: "setting-view" },

      { path: "/app/category/:category", component: "category-view" },

      { path: "/app/create", component: "create-view" },

      { path: "/app/user/:userid", component: "public-profile-view" },

      { path: "/app/login", component: "login-view" },

      { path: "/app/signup", component: "signup-view" },

      {
        path: "(.*)",
        action: () => {
          Router.go("/app/"); // Redirect to default route
        },
      },
    ]);
  }

  render() {
    return html`
      <auth-required>
        <navbar-component></navbar-component>
        <div id="outlet"></div>
      </auth-required>
    `;
  }
}
