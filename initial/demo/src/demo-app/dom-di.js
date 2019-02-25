export class DomDI {
  static makeContainer(element) {
    element.addEventListener('register-instance', (event) => {
      alert('Red ' + event.detail.key);
      // const key = event.detail.key;
      // const instance = event.detail.instance;

      // const provider = this._getProvider(key, false);
      // if (provider) {
      //   // todo always re-assign the instance, even if its already assigned?
      //   provider.instance = instance;
      //   for (let i = 0; i < provider.callbacks.length; i++) {
      //     provider.callbacks[i](instance);
      //   }
      // } else {
      //   this._addProvider(key, instance, null, false);
      //   if (this._children.length) {
      //     this._fulfillChildDependencies(key, instance, this._children);
      //   }
      // }

      event.preventDefault();
      event.stopPropagation();
    });
  }
  static makeProvider(element, key, instance) {
    let event = new CustomEvent('register-instance', {
      detail: {
        key,
        instance
      },
      bubbles: true,
      cancelable: true,
      composed: true
    });
    element.dispatchEvent(event);
  }
}