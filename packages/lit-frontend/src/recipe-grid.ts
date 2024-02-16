import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./recipe-card.ts";
import { property } from "lit/decorators.js";


@customElement("recipe-grid")
class RecipeGrid extends LitElement {
  @property({ reflect: true, type: Boolean })
  sorted: boolean = false;


  recipes = [
    { 
      title: "Steak and Bordelaise Sauce", 
      cuisine: "American", 
      price: "$$$", 
      image: "/images/steak.jpeg" 
    },
    { 
      title: "Beef Pho", 
      cuisine: "Vietnamese", 
      price: "$$", 
      image: "/images/pho.jpeg" 
    },
    { 
      title: "Scalloped Potatoes", 
      cuisine: "American", 
      price: "$", 
      image: "/images/potatoes.jpeg" 
    },
    { 
      title: "Lemon Garlic Chicken Pasta", 
      cuisine: "American", 
      price: "$", 
      image: "/images/lemon-chicken.png" 
    },
    { 
      title: "Beef Pho", 
      cuisine: "Vietnamese", 
      price: "$$", 
      image: "/images/pho.jpeg" 
    }
  ];

  

  sortedRecipes = [...this.recipes]; // Copy of the recipes array for sorting

  sortAlphabetically() {
    if (this.sorted) {
      this.sortedRecipes = this.sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
      this.sorted = false;
    }
    else {
      this.sortedRecipes = this.sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
      this.sorted = true;
    }

    this.requestUpdate(); // Trigger LitElement to update the UI
  }

  render() {
    return html`
      <div class="container">
        <button @click="${this.sortAlphabetically}" class="sort-button">Sort Alphabetically</button>
        <ul class="recipe-list">
          ${this.sortedRecipes.map(recipe => html`
            <recipe-card>
              <img slot="image" src="${recipe.image}" alt="${recipe.title}" />
              <span slot="title">${recipe.title}</span>
              <span slot="cuisine">${recipe.cuisine}</span>
              <span slot="price">${recipe.price}</span>
            </recipe-card>
          `)}
        </ul>
      </div>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
    }

    :host {
      display: inline-block;
      position: relative;
    }

    .recipe-list {
      /* display: flex;
    justify-content: space-between; */

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      /* I want my rows to be the exact same height as my auto generated columns */
      grid-auto-rows: 1fr;

      gap: 20px;

      font-family: "Montserrat", sans-serif;
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

customElements.define("recipe-grid", RecipeGrid);