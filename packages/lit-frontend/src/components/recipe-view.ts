import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("recipe-view")
export class Recipe extends LitElement {
  @state()
  activeTab: number = 0;

  private changeTab(tabNum: number) {
    this.activeTab = tabNum;
  }

  private renderDirections() {
    return html`
      <div class="card-directions">
        <h4>Step 1</h4>
        <p>
          Season steaks with black pepper and place on a wire rack set over a
          tray; refrigerate uncovered, 8 hours to overnight.
        </p>

        <h4>Step 2</h4>
        <p>
          Heat vegetable oil in a large skillet over high heat. Cook steaks in
          hot oil until browned on one side, 4 to 5 minutes. Reduce heat to
          medium-high and turn steaks. Continue cooking until steaks start to
          firm and are reddish-pink and juicy in the center, 4 to 6 minutes
          more. An instant-read thermometer inserted into the center should read
          130 degrees F (54 degrees C) for medium-rare. Transfer meat to a plate
          to rest, 5 to 10 minutes. Set the skillet aside
        </p>

        <h4>Step 3</h4>
        <p>
          Place chopped beef scraps in a cold skillet and heat over medium-high
          heat. Cook and stir until meat is browned and caramelized. Add
          shallots and a pinch of salt; saute until shallots are golden brown
          and are softened, about 5 minutes more.
        </p>

        <h4>Step 4</h4>
        <p>
          Pour red wine into the skillet and bring to a boil; cook and stir
          until wine is almost completely evaporated, 2 to 4 minutes. Add
          chicken broth and bring to a simmer. Reduce heat to low and cook until
          reduced by about half, 60 to 90 minutes. Strain sauce into a bowl and
          skim any fat that rises to the top.
        </p>

        <h4>Step 5</h4>
        <p>
          Heat the empty steak skillet over medium-high heat. Pour strained
          sauce into the skillet and bring to a boil while scraping the browned
          bits of food off of the bottom of the pan with a wooden spoon. Season
          sauce with salt and pepper. Continue cooking until reduced and
          thickened, 3 to 5 minutes
        </p>

        <h4>Step 6</h4>
        <p>
          Remove the skillet from the heat. Whisk butter into sauce until melted
          and smooth.
        </p>

        <h4>Step 7</h4>
        <p>Spoon sauce over top of steak and plate.</p>
      </div>
    `;
  }

  private renderIngredients() {
    return html`
      <div class="card-ingredients">
        <h4>Ingredients</h4>
        <p>2 (1 1/2-inch-thick) bone-in rib-eye steaks</p>
        <p>1/2 teaspoon freshly ground black pepper</p>
        <p>1 tablespoon vegetable oil</p>
        <p>1/4 cup chopped beef scraps</p>
        <p>1/2 cup chopped shallots</p>
        <p>1/2 cup red wine</p>
        <p>1 cup chicken broth</p>
        <p>1/4 cup unsalted butter</p>
      </div>
    `;
  }

  private renderTools() {
    return html`
      <div class="card-tools">
        <h4>Tools</h4>
        <p>Skillet</p>
        <p>Wire rack</p>
        <p>Instant-read thermometer</p>
        <p>Wooden spoon</p>
      </div>
    `;
  }


  render() {
    return html`
      <div>
        <section class="recipe-content">
          <h2>Steak and Bordelaise Sauce</h2>

          <div class="recipe-stats">
            <div class="time-stat">
              <img src="/icons/alarm.svg" alt="heart" width="20px" />
              <p>30 minutes</p>
            </div>

            <div class="cost-stat">
              <img src="/icons/money.svg" alt="money" width="25px" />
              <p>25$</p>
            </div>
          </div>
          <div class="tags-container">
            <div class="tag-title">
              <img src="/icons/tag.svg" alt="tag icon" width="25px" />
              <h5>Tags:</h5>
            </div>

            <div class="tags">
              <p>French</p>
              <p>Beef</p>
              <p>Date Night</p>
            </div>
          </div>
          <div class="recipe-intro">
            <div class="recipe-card">
              <div class="card-categories">
                <p
                  id="${this.activeTab === 0 ? "selected-tab" : ""}"
                  @click=${() => this.changeTab(0)}
                >
                  Directions
                </p>
                <p
                  id="${this.activeTab === 1 ? "selected-tab" : ""}"
                  @click=${() => this.changeTab(1)}
                >
                  Ingredients
                </p>
                <p
                  id="${this.activeTab === 2 ? "selected-tab" : ""}"
                  @click=${() => this.changeTab(2)}
                >
                  Tools
                </p>
              </div>
              <div class="card-content-container">
                <div class="card-content">
                  ${this.activeTab === 0 ? this.renderDirections() : html``}
                  ${this.activeTab === 1 ? this.renderIngredients() : html``}
                  ${this.activeTab === 2 ? this.renderTools() : html``}
                </div>
              </div>
            </div>

            <div class="recipe-images">
              <img src="/images/steak.jpeg" alt="Recipe Image" />
            </div>
          </div>
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

    .recipe-content h2 {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      font-size: 26px;
      padding-top: 20px;
      padding-bottom: 10px;
      color: var(--color-primary);
    }

    .rating-container {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }

    .rating-container svg {
      width: 24px;
      height: 24px;
      fill: rgb(255, 102, 0);
    }

    .recipe-stats {
      display: inline-block;
      display: flex;
      gap: 10px;
    }

    .recipe-stats img {
      background-color: inherit;
    }

    .recipe-stats p {
      font-size: 15px;
      font-weight: 300;
      color: #333;
      background-color: inherit;
    }

    .time-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(255, 255, 204);

      padding: 7px;
      justify-content: center;
    }

    .cost-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(193, 245, 193);

      padding: 7px;
      justify-content: center;
    }

    .tags-container {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .tag-title {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      /* border: 1px solid rgb(255, 204, 204); */
      padding: 7px;
    }

    .tag-title h5 {
      font-size: 15px;
      font-weight: 600;
      color: var(--color-primary);
    }

    .tags {
      display: flex;
      gap: 15px;
      align-items: center;
      justify-content: center;
      overflow-x: scroll;
    }

    .tags p {
      font-size: 15px;
      font-weight: 400;
      color: var(--color-primary);
      padding: 7px;
      border-radius: 3px;
      background-color: rgb(242, 241, 241);
    }

    .tags p:hover {
      cursor: pointer;
      background-color: rgb(27, 33, 100);
      color: white;
    }

    .heart-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(255, 204, 204);
      padding: 7px;
      justify-content: center;
    }

    .recipe-intro {
      margin-top: 15px;
      display: grid;
      grid-template-columns: 5fr 4fr;
      margin-bottom: 20px;
      grid-template-rows: 100%;
      gap: 20px;
    }

    .recipe-card {
      border: 1px solid var(--color-light);
      border-radius: 10px;
      height: 70vh;
      box-sizing: border-box;
    }

    .recipe-images {
      width: 100%;
      height: 70vh;
    }

    .recipe-intro img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }

    /* tab containers */
    .card-categories {
      display: flex;
      align-items: center;
      gap: 10px;

      background-color: rgb(242, 242, 242);
      border-radius: 8px 8px 0px 0px;
      /* border-bottom: 1px solid var(--color-light); */
      padding-left: 10px;
      padding-top: 10px;
    }

    /* tab elements */
    .card-categories p {
      display: flex;
      justify-content: center;
      font-size: 17px;
      font-weight: 600;
      color: #333;
      padding: 12px;
      background-color: rgb(255, 255, 255);
      /* make the radius 8px only on the top corners */
      border-radius: 8px 8px 0px 0px;
      margin-right: 10px;
      width: 100px;
    }

    .card-categories p:hover {
      cursor: pointer;
    }

    .card-categories #selected-tab {
      background-color: var(--color-primary-orange);
      color: white;
    }

    .card-content-container {
      height: calc(100% - 54px);
      border-radius: 0px 0px 8px 8px;
      background-color: rgb(242, 242, 242);
    }

    .card-content {
      margin-left: 10px;
      margin-right: 10px;
      border-top: 2px solid var(--color-primary-orange);
      height: calc(100% - 35px);
      border-radius: 0px 0px 8px 8px;
      padding: 10px;
      padding-top: 15px;
      background-color: white;
      overflow-y: scroll;
    }

    .card-directions {
      background-color: inherit;
    }

    .card-directions h4 {
      font-size: 20px;
      font-weight: 600;
      background-color: inherit;
      margin-bottom: 5px;
    }

    .card-directions p {
      font-size: 16px;
      font-weight: 400;
      color: #181818;
      margin-bottom: 28px;
      background-color: inherit;
    }

    @media screen and (max-width: 1300px) {
      .recipe-intro {
        display: flex;
        flex-direction: column-reverse;
      }

      .recipe-images {
        height: 30vh;
      }
    }

    @media screen and (max-width: 500px) {
      /* make recipe category smaller */
      .card-categories p {
        font-size: 12px;
        padding: 5px;
        margin-right: 5px;
        width: 80px;
      }

      /* make the recipe-instructions text smaller */
      .card-directions h4 {
        font-size: 18px;
      }

      .card-directions p {
        font-size: 16px;
      }

      .card-content-container {
        height: calc(100% - 34px);
      }
    }

    .review-content {
      margin-top: 30px;
    }

    .review-content h3 {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 10px;
    }

    .review-stat {
      height: 150px;
      border-bottom: 1px solid var(--color-light);
    }
  `;
}
