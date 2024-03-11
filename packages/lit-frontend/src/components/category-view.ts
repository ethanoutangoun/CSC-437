import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { RouterLocation } from "@vaadin/router";
import { APIRequest } from "./rest.ts";
import { Recipe } from "../models/recipe.ts";

import "./recipe-grid";

@customElement("category-view")
export class CategoryView extends LitElement {
  @property({ attribute: false })
  location: RouterLocation | undefined;

  @state()
  category: string | undefined;

  // holds capitalized category name
  @state()
  Category: string | undefined;

  @state()
  recipeList: Recipe[] = [];
  sort: boolean = false;

  convertToTitleCase(word: string): string {
    const words = word.split("-");
    const capitalizedWords = words.map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1)
    );
    return capitalizedWords.join(" ");
  }

  connectedCallback(): void {
    super.connectedCallback();

    if (this.location) {
      const pathnameParts = this.location.pathname.split("/");
      const categoryIndex = pathnameParts.indexOf("category") + 1; // Get the index of the next segment after 'profile'
      const category = pathnameParts[categoryIndex];

      this.category = category;
      let capitalizedCategory = this.convertToTitleCase(category);

      this.Category = capitalizedCategory;

      const path = `/recipes/tag/${this.category}`;

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
  }

  handleSort(event: CustomEvent) {
    let result = event.detail;
    this.sort = result;
    this.requestUpdate();
  }

  render() {
    return html`
      <div>
        <category-list @sort-requested=${this.handleSort}></category-list>
        <section class="trending">
          <h2>${this.Category} Recipes</h2>

          <recipe-grid
            .recipeList=${this.recipeList}
            .sort=${this.sort}
          ></recipe-grid>
        </section>
      </div>
    `;
  }

  static styles = css`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .trending {
      margin-bottom: 20px;
    }

    .trending h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }
  `;
}
