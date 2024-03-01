import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Router } from "@vaadin/router";

import "./filter-popup.ts";

@customElement("category-list")
export class CategoryList extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  render() {
    return html`
      <section class="category">
        <div>
          <ul class="category-list">
            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/flame.svg" alt="flame-icon" width="33px" />
                </div>
                <p>Trending</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/american.svg" alt="American" width="35px" />
                </div>
                <p>American</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/italian.svg" alt="Italian" width="35px" />
                </div>
                <p>Italian</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img
                    src="/icons/mexican.svg"
                    alt="mexican-icon"
                    width="35px"
                  />
                </div>
                <p>Mexican</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img
                    src="/icons/japanese.svg"
                    alt="japanese-icon"
                    width="35px"
                  />
                </div>
                <p>Japanese</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/indian.svg" alt="indian-icon" width="42px" />
                </div>
                <p>Indian</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/wine.svg" alt="wine-icon" width="36px" />
                </div>
                <p>Date Night</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${() => Router.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img
                    src="/icons/chicken.svg"
                    alt="chicken-icon"
                    width="32px"
                  />
                </div>
                <p>Chicken</p>
              </div>
            </li>

            <li>
              <a href="/app/category/1">
                <div class="more-icon">
                  <svg class="m-icon">
                    <use href="/icons/right-arrow-2.svg#icon-right-arrow" />
                  </svg>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <filter-popup></filter-popup>
      </section>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .category {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      justify-content: space-between;
      overflow-x: scroll;
    }

    .category::-webkit-scrollbar {
      display: none;
    }

    .category-list {
      margin-top: 10px;
      display: flex;
      list-style: none;
      gap: 30px;
      align-items: center;
    }

    .category-list div {
      text-decoration: none;
      color: var(--color-primary);
      font-size: 12px;
      font-weight: 300;
    }

    .category-item {
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 3px;
      border-bottom: 2px solid transparent;
      transition: border-bottom 0.3s ease;
    }

    .category-item p {
      white-space: nowrap;
      color: var(--color-primary);
    }

    .category-item:hover {
      border-bottom: 2px solid rgb(190, 187, 187);
      cursor: pointer;
    }

    .more-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--color-light);
      padding: 6px;
      padding-left: 8px;
      border-radius: 50%;
    }

    .m-icon {
      display: inline;
      height: 15px;
      width: 15px;
      vertical-align: top;
      fill: var(--color-primary);
      stroke: var(--color-primary);
      transform: translate(1.5px, 1px);
    }

    .image-border {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
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

    footer {
      border-top: 1px solid var(--color-border);
      color: var(--color-primary);
      padding: 20px; /* Padding inside the footer */
      padding-left: 80px;
      padding-right: 80px;
      margin-top: 10px;
    }

    footer p {
      font-size: 14px;
    }

    @media screen and (max-width: 800px) {
      .content {
        margin-left: 50px;
        margin-right: 50px;
      }

      .navbar-content {
        margin-left: 50px;
        margin-right: 50px;
      }

      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      }

      footer {
        padding-left: 50px;
        padding-right: 50px;
      }
    }

    @media screen and (max-width: 600px) {
      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    @media screen and (max-width: 500px) {
      .content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .navbar-content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .group-icon {
        display: none;
      }

      .recipe-list {
        grid-template-columns: 1fr;
      }

      footer {
        padding-left: 31px;
        padding-right: 31px;
      }
    }
  `;
}
