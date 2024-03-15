import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { APIRequest } from "./rest.ts";
import { Recipe } from "../models/recipe.ts";
import "./category-list.ts";
import "./recipe-grid.ts";

@customElement("trending-view")
export class TrendingView extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @state()
  recipeList: Recipe[] = [];
  sort: [string, boolean] = ["", true];

  connectedCallback(): void {
    super.connectedCallback();
    const path = "/recipes/trending";
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
          <h2>Trending Recipes</h2>

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
