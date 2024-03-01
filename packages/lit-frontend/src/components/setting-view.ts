import { html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

@customElement("setting-view")
export class SettingView extends LitElement {
  render() {
    return html`
      <div class="profile-content">
        <div class="profile-header">
          <h2>Settings</h2>
        </div>

        <div class="pi-all">
          <div class="pi-container">
            <div class="pi-block">
              <div class="pi-header">
                <h5>Appearance</h5>
              </div>
              <div class="pi-content">
                <toggle-switch></toggle-switch>
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Font Size</h5>
                <h4>Edit</h4>
              </div>
              <div class="pi-content">
                <p>Medium</p>
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Delete Account</h5>
                <h4>Edit</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS)];
}
