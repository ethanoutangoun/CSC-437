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

@customElement("my-app")
export class MyApp extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {
    console.log("Router initialized");
    const router = new Router(this.shadowRoot?.querySelector("#outlet"));
    router.setRoutes([
      {
        path: "/app/profile/:userid",
        component: "user-profile",
      },

      
      { path: "/app/", component: "trending-view" },

      {path: "/app/account", component: "account-view"},

      {path: "/app/groups", component: "group-view"},
      
      {path: "/app/my-recipes", component: "user-recipes"},

      {path: "/app/recipe/:recipeid", component: "recipe-view"},

      {path: "/app/settings", component: "setting-view"},

      {path: "/app/category/:category", component: "category-view"},


      {
        path: "(.*)",
        action: () => {
          console.log("Redirecting to /app/");
          Router.go("/app/"); // Redirect to default route
        },
      },
    ]);

    console.log("Routes:", router.getRoutes());
  }

  render() {
    return html` <div id="outlet"></div> `;
  }
}
