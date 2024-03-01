import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import "./recipe-grid.ts";

@customElement("user-recipes")
export class UserRecipes extends LitElement {
  render() {
    return html`
      <section class="my-recipes">
        <h2>My Recipes</h2>

        <recipe-grid></recipe-grid>
      </section>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .my-recipes {
      margin-top: 120px;
    }

    .my-recipes h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }
  `;
}
