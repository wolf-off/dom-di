import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { DomDI } from './dom-di';
/**
 * @customElement
 * @polymer
 */
class DemoApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <ella-p prop1='inst1'></ella-p>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'demo-app'
      }
    };
  }
  ready() {
    super.ready();
    DomDI.makeContainer(this);
    let element = this.root.querySelector("ella-p");
    DomDI.makeProvider(element);
  }
}

window.customElements.define('demo-app', DemoApp);
