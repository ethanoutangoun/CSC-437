import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./recipe-card.ts";
import { Recipe } from "../models/recipe.ts";

@customElement("recipe-grid")
export class RecipeGrid extends LitElement {
  @property({ reflect: true, type: Boolean })
  sorted: boolean = false;

  @property({ reflect: true, type: Array })
  recipeList: Recipe[] = [];

  sortedRecipes = [...this.recipeList]; // Copy of the recipes array for sorting

  // convert price (number) to $$$
  convertPrice(price: number) {
    let cost = "";
    let count = 0;
    for (let i = 0; i < price; i += 10) {
      cost += "$";
      count++;

      if (count > 4) {
        break;
      }
    }
    return cost;
  }

  sortAlphabetically() {
    if (this.sorted) {
      this.sortedRecipes = this.sortedRecipes.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      this.sorted = false;
    } else {
      this.sortedRecipes = this.sortedRecipes.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      this.sorted = true;
    }
    console.log("Sorted recipes", this.sortedRecipes);
    this.requestUpdate(); // Trigger LitElement to update the UI
  }

  render() {
    return html`
      <div class="container">
        <ul class="recipe-list">
          ${this.recipeList.map(
            (recipe) => html`
              <recipe-card .id=${recipe._id}>
                <img
                  slot="image"
                  src="${recipe.picture}"
                  alt="${recipe.name}"
                />
                <span slot="title">${recipe.name}</span>
                <span slot="cuisine">${recipe.cuisine}</span>
                <span slot="price">${this.convertPrice(recipe.cost)}</span>
              </recipe-card>
            `
          )}
        </ul>
      </div>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      font-family: "Raleway", sans-serif;
    }

    :host {
      display: inline-block;
      position: relative;
    }

    .recipe-list {
     

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   
      grid-auto-rows: 1fr;

      gap: 20px;

      font-family: "Raleway", sans-serif;
      flex-wrap: wrap;
    }

    @media screen and (max-width: 800px) {
      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      }
    }

    @media screen and (max-width: 600px) {
      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    @media screen and (max-width: 500px) {
      .recipe-list {
        grid-template-columns: 1fr;
      }
    }
  `;
}
