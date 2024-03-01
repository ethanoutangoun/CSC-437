import { css, html, LitElement } from "lit";
import { customElement} from "lit/decorators.js";
import { Router } from "@vaadin/router";

@customElement("recipe-card")
export class RecipeCard extends LitElement {
  static styles = css`
    * {
      display: block;
      margin: 0;
      padding: 0;
    }

    .recipe-container h4 {
      font-size: 15px;
      font-weight: 550;
      color: var(--color-primary);
      font-family: "Montserrat", sans-serif;
    }

    li {
      list-style: none;
    }

    .recipe-container a {
      text-decoration: none;
    }

    .recipe-container p {
      font-size: 15px;
      font-weight: 300;
      color: var(--color-light-alt);
    }

    .recipe-container {
      margin-bottom: 50px;
      width: 100%;
      height: 100%;
      position: relative;
      // margin: 0;
      display: flex;
      align-items: stretch;
    }

    .recipe-container:hover {
      cursor: pointer;
    }

    .recipe-container h4 {
      margin-top: 10px;
    }

    .recipe-img-container {
      width: 100%;
      position: relative;
      display: flex;
      align-items: stretch;

      height: calc(100% - 100px);
    }

    .recipe-container img {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }

    ::slotted(img){
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  `;

  render() {
    return html`
      <li class="recipe-container">
        <div @click = ${()=> Router.go("/app/recipe/1")}>
          <div class="recipe-img-container">
           <slot name="image"></slot>
          </div>
          <h4><slot name="title"></slot></h4>
          <p><slot name="cuisine"></slot></p>
          <p><slot name="price"></slot></p>
        </div>
      </li>
    `;
  }
}
