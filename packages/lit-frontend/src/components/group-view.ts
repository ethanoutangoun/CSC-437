import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

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

  static styles = css`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .profile-content {
      margin-top: 100px;
      margin-left: 80px;
      margin-right: 80px;
    }

    .groups-page {
      margin-top: 130px;
      margin-bottom: 130px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 50px;
    }

    .find-group form {
      margin-top: 20px;
    }

    .find-group input {
      padding: 14px;
      font-size: 16px;
      width: 100%;
      max-width: 800px;
      border-radius: 10px;
      border: 1px solid var(--color-light);
    }

    .find-group h2 {
      color: var(--color-primary);
    }

    .find-group button {
      margin-top: 20px;
      padding: 14px;
      border-radius: 4px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 16px;
      font-weight: 600;
    }

    .find-group button:hover {
      cursor: pointer;
      background-color: rgb(212, 126, 7);
    }

    .my-groups {
      margin-top: 20px;
      max-width: 800px;
    }

    .my-groups h2 {
      color: var(--color-primary);
      margin-bottom: 20px;
    }

    .my-groups li {
      /* margin-top: 20px; */
      list-style: none;
      /* margin-bottom: 20px; */
      /* padding: 30px; */
      /* box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1); */
    }

    .my-groups p {
      background-color: inherit;
    }

    .my-groups li a {
      display: block;
      padding: 30px;

      text-decoration: none;
      color: var(--color-primary);
      width: 100%;
      height: 100%;
      margin-bottom: 20px;
      border-bottom: 1px solid #d6d5d5;
    }

    .my-groups li a:hover {
      cursor: pointer;
      box-shadow: 0px 5px 5px var(--color-card-highlight);
    }

    .my-groups button {
      padding: 14px;
      border-radius: 4px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 16px;
      font-weight: 600;
    }

    .my-groups button:hover {
      cursor: pointer;
      background-color: rgb(212, 126, 7);
    }
  `;
}
