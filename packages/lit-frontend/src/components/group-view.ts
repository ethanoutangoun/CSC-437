import { html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

@customElement("group-view")
export class GroupView extends LitElement {
  render() {
    return html`
      <div class="profile-content">
        <div class="groups-page">
          <section class="find-group">
            <h2>Find Groups</h2>

            <form action="">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search for groups"
              />
            </form>
            <button class="search-btn">Search</button>
          </section>

          <section class="my-groups">
            <h2>My Groups</h2>
            <div>
              <ul>
                <li>
                  <a>Group 1</a>
                </li>
                <li>
                  <a>Group 2</a>
                </li>
                <li>
                  <a>Group 3</a>
                </li>
              </ul>
            </div>
            <button onclick="alert('New group created')">
              <p>Create New Group</p>
            </button>
          </section>
        </div>
      </div>
    `;
  }

  static styles = [unsafeCSS(resetCSS), unsafeCSS(pageCSS)];
}
