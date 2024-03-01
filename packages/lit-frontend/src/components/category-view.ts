import { html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

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

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS)];
}
