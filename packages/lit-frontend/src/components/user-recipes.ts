import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@vaadin/router";

import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

@customElement("user-recipes")
export class UserRecipes extends LitElement {
  render() {
    return html`
      <section class="my-recipes">
        <h2>My Recipes</h2>

        <ul class="recipe-list">
          <li class="recipe-container">
            <a href="recipe.html">
              <div class="recipe-img-container">
                <img src="/images/steak.jpeg" alt="Recipe 1" />
              </div>

              <h4>Steak and Bordelaise Sauce</h4>
              <p>French</p>
              <p>$$$</p>
            </a>
          </li>

          <li class="recipe-container">
            <a href="recipe.html">
              <div class="recipe-img-container">
                <img src="/images/pho.jpeg" alt="Recipe 1" />
              </div>
              <h4>Beef Pho</h4>
              <p>Vietnamese</p>
              <p>$$</p>
            </a>
          </li>

          <li class="recipe-container">
            <a href="recipe.html">
              <div class="recipe-img-container">
                <img src="/images/potatoes.jpeg" alt="Recipe 1" />
              </div>
              <h4>Scalloped Potatoes</h4>
              <p>American</p>
              <p>$</p>
            </a>
          </li>

          <li class="recipe-container">
            <a href="recipe.html">
              <div class="recipe-img-container">
                <img src="/images/lemon-chicken.png" alt="Recipe 1" />
              </div>
              <h4>Lemon Garlic Chicken Pasta</h4>
              <p>American</p>
              <p>$$</p>
            </a>
          </li>
        </ul>
      </section>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
  ];
}
