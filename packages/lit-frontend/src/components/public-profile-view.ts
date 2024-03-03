import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./recipe-grid";

@customElement("public-profile-view")
export class PublicProfileView extends LitElement {
  render() {
    return html`
      <div class="public-profile">
        <div class="public-profile-content">
          <h1 id="main">Ethan's Profile</h1>
          <img src="/images/dude.jpg" alt="Ethan's Profile Picture" />
          <div class="public-stats">
            <p>Joined: 1/1/2020</p>
            <p>Recipes: 4</p>
            <p>Likes: 230</p>
          </div>

          <div class="public-bio">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ab
              commodi dolores natus id excepturi modi voluptatibus at, corrupti
              totam aperiam ea reiciendis nobis autem consequatur ipsam itaque.
              Accusantium dicta porro quae, nam blanditiis officia reiciendis
              excepturi ipsa voluptatibus voluptates?
            </p>
          </div>
        </div>

        <section class="my-recipes">
          <h2>Featured Recipes</h2>
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

    .public-profile {
      margin-top: 120px;
      margin-bottom: 80px;
    }

    .public-profile h1 {
      font-size: 35px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }

    .public-profile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .public-profile-content img {
      margin-top: 30px;
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 100%;
    }

    .public-stats {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .public-stats p {
      font-size: 15px;
      font-weight: 300;
      color: var(--color-primary);
    }

    .public-bio {
      margin-top: 40px;
      display: flex;
      align-items: center;
      max-width: 800px;
      color: var(--color-primary);
    }

    .my-recipes {
      margin-top: 120px;
    }

    .my-recipes h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }
  `;
}
