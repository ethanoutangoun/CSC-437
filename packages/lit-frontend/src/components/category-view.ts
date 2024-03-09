import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";


import "./recipe-grid";

@customElement("category-view")
export class CategoryView extends LitElement {
  render() {
    return html`
      <div>
        <category-list></category-list>
        <section class="trending">
          <h2>Category Name</h2>

          <recipe-grid></recipe-grid>
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
