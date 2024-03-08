import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("footer-element")
export class FooterElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  render() {
    return html`
      <footer>
        <p>© 2024 Ethan Outangoun</p>
      </footer>
    `;
  }

  static styles = css`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  footer {
    border-top: 1px solid var(--color-border);
    color: var(--color-primary);
    padding: 20px; /* Padding inside the footer */
    padding-left: 80px;
    padding-right: 80px;
    margin-top: 60px;
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
