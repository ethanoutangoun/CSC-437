import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { APIRequest } from "./rest.ts";
import { Recipe } from "../models/recipe.ts";
import "./category-list.ts";
import "./recipe-grid.ts";
import { RouterLocation } from "@vaadin/router";

@customElement("search-view")
export class SearchView extends LitElement {
  @property({ attribute: false })
  location: RouterLocation | undefined;

  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @property({ reflect: true, type: String })
  input: string = "";

  @state()
  recipeList: Recipe[] = [];
  sort: [string, boolean] = ["", true];
  recipeCount: number = 0;
  isPending = true;

  connectedCallback(): void {
    super.connectedCallback();

    if (this.location) {
      const pathnameParts = this.location.pathname.split("/");
      const userSearchIndex = pathnameParts.indexOf("search") + 1; // Get the index of the next segment after 'profile'
      const userInput = pathnameParts[userSearchIndex];

      this.input = userInput;

      const path = "/recipes/search/" + userInput;
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
          this.recipeCount = this.recipeList.length;
          this.isPending = false;
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
          <h2>Search Results for '${this.input}'</h2>
          ${!this.isPending
            ? html`<p>
                ${this.recipeCount}
                ${this.recipeCount > 1 ? html`results` : html`result`}
              </p>`
            : html`<p>Loading...</p>`}

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
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    p {
      margin-bottom: 10px;
      color: var(--color-light-alt);
      font-size: 14px;
    }

    .trending {
      margin-bottom: 20px;
    }

    .trending h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
    }
  `;
}
