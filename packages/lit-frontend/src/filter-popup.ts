import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

class FilterPopup extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  static styles = css`
    * {
      margin: 0;
      padding: 0;
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Darkens the background */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .popup {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      position: relative;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }

    .filter-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--color-main-bg);
      margin-left: 30px;
      border: 1px solid var(--color-light);
    }

    .filter-icon {
      display: inline;
      height: 25px;
      width: 25px;
      vertical-align: top;
      fill: var(--color-primary);
      stroke: var(--color-primary);
      transform: translate(1.5px, 1px);
      background-color: inherit;
    }

    .filter-container h4 {
      font-size: 15px;
      font-weight: 500;
      color: var(--color-primary);
      background-color: inherit;
    }

    .filter-container:hover {
      cursor: pointer;
      background-color: rgb(230, 230, 230);
    }
  `;

  openPopup() {
    this.open = true;
    // document.body.style.overflow = 'hidden'; // Disable scrolling on the background
  }

  closePopup() {
    this.open = false;
    document.body.style.overflow = ""; // Enable scrolling back on the background
  }

  triggerSort() {
    this.dispatchEvent(new CustomEvent("sort-requested"));
  }

  render() {
    return html`
  
        <button class="filter-container" @click="${this.openPopup}">
          <svg class="filter-icon">
            <use href="/icons/filter.svg#icon-filter" />
          </svg>
          <h4>Filter</h4>
        </button>

        ${
          this.open
            ? html`
                <div class="popup-overlay" @click="${this.closePopup}"  >
                  <div class="popup">
                    <button @click="${this.closePopup}" class="close-button">
                      Close
                    </button>

                    <button @click="${this.triggerSort}" class="sort-button">
                      Sort Alphabetically
                    </button>
                 
                    <p>This is the filter popup content.</p>
                  </div>
                </div>
              `
            : ""
        }
      </div>
    `;
  }
}

customElements.define("filter-popup", FilterPopup);
