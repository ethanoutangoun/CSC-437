import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("footer-component")
export class FooterComponent extends LitElement {
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
  
    footer {
      padding-left: 50px;
      padding-right: 50px;
    }
  }
  

  
  @media screen and (max-width: 500px) {

  
    footer {
      padding-left: 31px;
      padding-right: 31px;
    }
  }
  
  `;
}
