import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./category-list.ts";
import "./recipe-grid.ts";


@customElement("trending-view")
export class TrendingView extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;



  render() {
    return html`
      <div>
  
        <category-list></category-list>
        <section class="trending">
          <h2>Trending Recipes</h2>

          <recipe-grid></recipe-grid>
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
