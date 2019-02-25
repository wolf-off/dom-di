import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class Ella extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div>[[prop1]]!</div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'ella-p'
      }
    };
  }
}

window.customElements.define('ella-p', Ella);
