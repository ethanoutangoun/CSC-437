import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Recipe } from "../models/recipe.ts";
import { authContext } from "./auth-required";
import { consume } from "@lit/context";
import { APIUser, APIRequest } from "./rest.ts";
import "./recipe-grid.ts";

@customElement("user-recipes")
export class UserRecipes extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @state()
  recipeList: Recipe[] = [];

  @consume({ context: authContext, subscribe: true })
  @property({ attribute: false })
  user?: APIUser;

  connectedCallback(): void {
    super.connectedCallback();
    const path = "/recipes/user/" + this.user?.username;

    console.log(path)
    const request = new APIRequest();
    request
      .getAbsolute(path)
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((json) => {
        this.recipeList = json;
        this.requestUpdate();
      });
  }

  render() {
    return html`
      <div>
        <section class="trending">
          <h2>My Recipes</h2>

          <recipe-grid .recipeList=${this.recipeList}></recipe-grid>
        </section>
      </div>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .trending {
      margin-bottom: 20px;
    }

    .trending h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
      margin-top: 110px;
    }
  `;
}
