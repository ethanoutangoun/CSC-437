import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";


import "./auth-required";

import "./user-profile";
import { RouterLocation } from "@vaadin/router";

@customElement("test-component")
export class TestComponent extends LitElement {
  @property({ attribute: false })
  location: RouterLocation | undefined;
 




  
  render() {
    // fill this in later

    return html`
      <auth-required>
       <user-profile .location="${this.location}"></user-profile>
      </auth-required>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }


  `;

}
