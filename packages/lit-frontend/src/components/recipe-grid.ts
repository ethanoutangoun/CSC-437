import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./recipe-card.ts";
import { Recipe } from "../models/recipe.ts";

@customElement("recipe-grid")
export class RecipeGrid extends LitElement {
  @property({ reflect: true, type: Boolean })
  sorted: boolean = false;

  @property({ reflect: true, type: Array })
  recipeList: Recipe[] = [];

  @property({ reflect: true, type: Boolean })
  sort: [string, boolean] = ["", true];

  sortedRecipes = [...this.recipeList]; // Copy of the recipes array for sorting

  // convert price (number) to $$$
  convertPrice(price: number) {
    let cost = "";
    let count = 0;
    for (let i = 0; i < price; i += 5) {
      cost += "$";
      count++;

      if (count > 4) {
        break;
      }
    }
    return cost;
  }

  sortAlphabetically() {
    this.sortedRecipes = [...this.recipeList]; // Copy of the recipes array for sorting

    if (this.sort[0] == "alphabetical") {
      if (this.sort[1]) {
        this.sortedRecipes = this.sortedRecipes.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else {
        this.sortedRecipes = this.sortedRecipes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
    }

    if (this.sort[0] == "price") {
      if (this.sort[1]) {
        this.sortedRecipes = this.sortedRecipes.sort((a, b) => b.cost - a.cost);
      } else {
        this.sortedRecipes = this.sortedRecipes.sort((a, b) => a.cost - b.cost);
      }
    }

    if (this.sort[0] === "date") {
      const ascendingOrder = this.sort[1]; // Boolean indicating sorting order
      this.sortedRecipes = this.sortedRecipes.sort((a, b) => {
        const dateA = new Date(a.date).getTime(); // Convert date to milliseconds
        const dateB = new Date(b.date).getTime(); // Convert date to milliseconds
        if (ascendingOrder) {
          return dateA - dateB; // Sort in ascending order
        } else {
          return dateB - dateA; // Sort in descending order
        }
      });
    }
    
    


    // console.log("Sorted recipes", this.sortedRecipes);
    this.requestUpdate(); // Trigger LitElement to update the UI
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("recipeList")) {
      this.sortedRecipes = [...this.recipeList]; // Copy of the recipes array for sorting
      this.requestUpdate(); // Trigger LitElement to update the UI
    }

    if (changedProperties.has("sort")) {
      this.sortAlphabetically(); // Update sortedRecipes whenever recipeList changes
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return html`
      <div class="container">
        <ul class="recipe-list">
          ${this.sortedRecipes.map(
            (recipe) => html`
              <recipe-card .id=${recipe._id}>
                <img
                  slot="image"
                  src="${recipe.picture}"
                  alt="${recipe.name}"
                />
                <span slot="title">${recipe.name}</span>
                <span slot="cuisine"
                  >${this.capitalizeFirstLetter(recipe.cuisine)}</span
                >
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

    // :host {
    //   display: inline-block;
    //   position: relative;
    // }

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
