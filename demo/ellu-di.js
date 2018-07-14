import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `ellu-di`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class ElluDi extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'ellu-di',
      },
    };
  }
}

window.customElements.define('ellu-di', ElluDi);
