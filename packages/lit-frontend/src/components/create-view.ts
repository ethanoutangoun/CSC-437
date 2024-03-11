import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { JSONRequest, APIUser } from "./rest";
import { consume } from "@lit/context";
import { authContext } from "./auth-required";
import { Router } from "@vaadin/router";
import "./cuisine-drop-down";

@customElement("create-view")
export class CreateView extends LitElement {
  @consume({ context: authContext, subscribe: true })
  @property({ attribute: false })
  user?: APIUser;

  @state()
  activeTab: number = 0;
  path = "/recipes";

  private changeTab(tabNum: number) {
    this.activeTab = tabNum;
  }

  @state()
  recipeCost: number | null = null;
  recipeTime: number | null = null;
  steps: string[] = []; // array of steps
  ingredients: string[] = []; // array of ingredients
  tools: string[] = []; // array of tools
  recipeTitle: string = "";
  editTitle: boolean = true;
  editTime: boolean = false;
  editCost: boolean = false;
  picture: string | null = null;
  cuisine: string | null = null;
  tags: string[] = [];

  private _addSteps(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;

    if (!newValue) return;

    this.steps.push(newValue);
    inputElement.value = "";
    this.requestUpdate(); // Trigger re-render
  }

  private _addIngredients(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;

    if (!newValue) return;

    this.ingredients.push(newValue);
    inputElement.value = "";
    this.requestUpdate(); // Trigger re-render
  }

  private _addTools(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;

    if (!newValue) return;

    this.tools.push(newValue);
    inputElement.value = "";
    this.requestUpdate(); // Trigger re-render
  }

  private renderDirections() {
    return html`<div class="card-directions">
      ${this.steps.map((step, index) => {
        return html`
          <h4>Step ${index + 1}</h4>
          <p>${step}</p>
        `;
      })}

      <div class="directions-input">
        <h4>Step ${this.steps.length + 1}</h4>
        <input
          type="text"
          name="directions"
          placeholder="Add Directions"
          @change=${(event: KeyboardEvent) => this._addSteps(event)}
        />
        <button @click=${this._addSteps}>Submit</button>
      </div>

      <div class="add-directions"></div>
    </div>`;
  }

  private renderIngredients() {
    return html`<div class="card-directions">
      ${this.ingredients.map((ingredient, index) => {
        return html`
          <h4>Ingredient ${index + 1}</h4>
          <p>${ingredient}</p>
        `;
      })}

      <div class="directions-input">
        <h4>Ingredient ${this.ingredients.length + 1}</h4>
        <input
          type="text"
          name="ingredients"
          placeholder="Add Ingredients"
          @change=${(event: KeyboardEvent) => this._addIngredients(event)}
        />
        <button @click=${this._addIngredients}>Submit</button>
      </div>

      <div class="add-directions"></div>
    </div>`;
  }

  private renderTools() {
    return html`<div class="card-directions">
      ${this.tools.map((tool, index) => {
        return html`
          <h4>Tool ${index + 1}</h4>
          <p>${tool}</p>
        `;
      })}

      <div class="directions-input">
        <h4>Tool ${this.tools.length + 1}</h4>
        <input
          type="text"
          name="tools"
          placeholder="Add Tools"
          @change=${(event: KeyboardEvent) => this._addTools(event)}
        />
        <button @click=${this._addTools}>Submit</button>
      </div>

      <div class="add-directions"></div>
    </div>`;
  }

  _handleSubmit() {
    if (!this.user?.authenticated) {
      console.log("User is not authenticated");
      return;
    }

    const newRecipe = {
      name: this.recipeTitle,
      cost: this.recipeCost,
      time: this.recipeTime,
      directions: this.steps,
      ingredients: this.ingredients,
      tools: this.tools,
      picture: this.picture || "",
      userid: this.user?.username,
      cuisine: this.cuisine,
      tags: this.tags,
    };
    console.log(newRecipe);

    const request = new JSONRequest(newRecipe);

    request
      .postAbsolute(this.path)
      .then((response) => {
        return response.json(); // Parse JSON response
      })
      .then((recipe) => {
        console.log(recipe._id);

        Router.go("/app/recipe/" + recipe._id);
      })

      .catch((error) => {
        console.error(error);
      });
  }

  handleEditTitle() {
    this.editTitle = !this.editTitle;
    this.requestUpdate();
  }

  handleTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;
    this.recipeTitle = newValue;
    this.handleEditTitle();
  }

  handleTimeChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;

    // if new value is not an int
    if (isNaN(parseInt(newValue))) {
      return;
    }

    this.recipeTime = parseInt(newValue);
    this.handleEditTime();
  }

  handleCostChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;

    // if new value is not an int
    if (isNaN(parseInt(newValue))) {
      return;
    }

    this.recipeCost = parseInt(newValue);
    this.handleEditCost();
  }

  handleImageUpload() {
    console.log("Image Upload");
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*"; // Allow only image files
    inputElement.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      const selectedFile = (target.files as FileList)[0];

      const reader: Promise<HTMLImageElement> = new Promise(
        (resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
            img.src = fr.result as string;
          };
          fr.onerror = (err) => reject(err);
          fr.readAsDataURL(selectedFile);
        }
      );

      reader.then((img: HTMLImageElement) => {
        // Calculate aspect ratio (e.g., 4:3)
        const aspectRatio = 3 / 3;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        // Calculate dimensions for cropping
        let newWidth,
          newHeight,
          offsetX = 0,
          offsetY = 0;
        if (img.width / img.height > aspectRatio) {
          newHeight = img.height;
          newWidth = img.height * aspectRatio;
          offsetX = (img.width - newWidth) / 2;
        } else {
          newWidth = img.width;
          newHeight = img.width / aspectRatio;
          offsetY = (img.height - newHeight) / 2;
        }

        // Set canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Perform the crop
        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          newWidth,
          newHeight,
          0,
          0,
          newWidth,
          newHeight
        );

        // Convert the cropped image to base64 data URL
        const croppedImage = canvas.toDataURL("image/jpeg", 1.0);

        this.picture = croppedImage;
        this.requestUpdate();
      });
    });
    inputElement.click();
  }

  handleEditTime() {
    this.editTime = !this.editTime;
    this.requestUpdate();
  }

  handleEditCost() {
    this.editCost = !this.editCost;
    this.requestUpdate();
  }

  handleCuisineChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;
    this.cuisine = newValue;
    this.requestUpdate();
  }

  handleCuisineSelected(event: CustomEvent) {
    let selectedCuisine = event.detail;
    selectedCuisine = selectedCuisine.toLowerCase();
    this.cuisine = selectedCuisine;
    this.tags.push(selectedCuisine);
  }

  render() {
    return html`<section class="recipe-content">
      <div class="space-between">
        <div class="create-class">
          ${this.editTitle
            ? html`<input
                class="title-input"
                type="text"
                name="title"
                value=${this.recipeTitle}
                placeholder="Recipe Title"
                @change=${(event: KeyboardEvent) =>
                  this.handleTitleChange(event)}
              />`
            : html`<h2 @click=${this.handleEditTitle}>${this.recipeTitle}</h2>`}
          <img
            @click=${this.recipeTitle != "" && this.handleEditTitle}
            src="/icons/edit.svg"
            alt="edit-icon"
          />
        </div>

        <div class="post-container">
          ${this.recipeTitle &&
          this.picture &&
          this.cuisine &&
          this.steps &&
          this.ingredients &&
          this.tools
            ? html`<button class="save-button" @click=${this._handleSubmit}>
                <h3>Post</h3>
              </button>`
            : html`<button class="save-button-disabled" disabled>
                <h3>Post</h3>
              </button>`}
        </div>
      </div>

      <div class="recipe-stats">
        <div class="time-stat">
          <img
            @click=${this.handleEditTime}
            src="/icons/alarm.svg"
            alt="heart"
            width="20px"
          />
          ${!this.editTime
            ? html`<p @click=${this.handleEditTime}>
                ${this.recipeTime
                  ? this.recipeTime + " minutes"
                  : html`Add Time`}
              </p>`
            : html`<input
                class="time-cost-buttons"
                type="text"
                @change=${(event: KeyboardEvent) =>
                  this.handleTimeChange(event)}
              />`}
        </div>

        <div class="cost-stat">
          <img
            @click=${this.handleEditCost}
            src="/icons/money.svg"
            alt="money"
            width="25px"
          />
          ${!this.editCost
            ? html`<p @click=${this.handleEditCost}>
                ${this.recipeCost ? "$" + this.recipeCost : html`Add Cost`}
              </p>`
            : html`<input
                class="time-cost-buttons"
                type="text"
                @change=${(event: KeyboardEvent) =>
                  this.handleCostChange(event)}
              />`}
        </div>
      </div>

      <div class="cuisine-input">
        <p>Cuisine:</p>
        <cuisine-drop-down
          @cuisine-selected=${this.handleCuisineSelected}
        ></cuisine-drop-down>
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
              ${this.activeTab === 0
                ? this.renderDirections()
                : this.activeTab === 1
                ? this.renderIngredients()
                : this.renderTools()}
            </div>
          </div>
        </div>

        <div
          @click=${this.handleImageUpload}
          class=${this.picture === null
            ? "edit-recipe-image"
            : "uploaded-image"}
        >
          ${this.picture
            ? html`<img src="${this.picture}" alt="Recipe Image" />`
            : html`<img src="/images/add-image.png" alt="Recipe Image" />`}
        </div>
      </div>
    </section>`;
  }

  static styles = css`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .cuisine-input {
      display: flex;
      align-items: center;
      gap: 10px;

      margin-top: 20px;
    }

    .save-button {
      padding: 20px;
      border-radius: 10px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 15px;
      font-weight: 600;
    }

    .save-button-disabled{
      padding: 20px;
      border-radius: 10px;
      border: none;
      background-color: lightgray;
      color: white;
      font-size: 15px;
      font-weight: 600;
    }

    


    .cuisine-input p {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-primary);
    }

    .time-cost-buttons {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid var(--color-light);
      width: 55px;
    }

    .uploaded-image {
      cursor: pointer;
      border: none:
      width: 100%;
      height: 70vh;
    }

    .uploaded-image:hover {
      opacity: 70%;
    }

    .uploaded-image img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }

    .title-input {
      padding: 10px;
      border: 1px solid var(--color-light);
      border-radius: 5px;
      font-size: 20px;
      font-weight: 600;
    }

    button {
      cursor: pointer;
    }
    .recipe-content {
      padding-bottom: 40px;
    }

    .recipe-content h2 {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      font-size: 26px;
      padding-top: 20px;
      padding-bottom: 20px;
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

    @media screen and (max-width: 1000px) {
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

    .create-class {
      display: flex;
      align-items: center;
      color: gray;
      gap: 10px;
    }

    .create-class img {
      width: 25px;
    }

    .edit-recipe-image {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed var(--color-light);
      border-radius: 10px;
    }

    .edit-recipe-image img {
      width: 40%;
      height: auto;
      opacity: 20%;
      object-fit: cover;
    }

    .edit-recipe-image:hover {
      cursor: pointer;
    }

    .tag-input input {
      padding: 5px;
      margin-left: 10px;
      border: 1px solid var(--color-light);
      border-radius: 5px;
    }

    .post-container {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .post-container h3 {
      background-color: inherit;
    }


    .post-container button:hover {
      cursor: pointer;
    }

    .add-directions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 40px;
      border-top: 1px solid var(--color-light);
      padding-top: 10px;
      background-color: inherit;
    }

    .add-directions p {
      margin: 0;
      padding: 0;
      background-color: inherit;
    }

    .add-directions img {
      width: 30px;
      background-color: inherit;
    }

    .add-directions img:hover {
      cursor: pointer;
    }

    .space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .directions-input {
      background-color: inherit;
    }

    .directions-input input {
      padding: 10px;
      width: 400px;
      border: 1px solid #949494;
      background-color: inherit;
    }

    .directions-input button {
      padding: 10px;
      border-radius: 10px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 15px;
      font-weight: 600;
    }
  `;
}
