const diContainerMixin = (superClass) => {
  return class Provider extends superClass {

    constructor() {
      super();
      this.container = new diContainer();
      const container = this.container;

      this.addEventListener('dom-di-request', (event) => {
        const request = event.detail.request;
        container.addRequest(request);
        event.preventDefault();
        event.stopPropagation();
      });

      this.addEventListener('dom-di-instance', (event) => {
        const type = event.detail.type;
        const instance = event.detail.instance;
        container.registerInstance(type, instance);
        event.preventDefault();
        event.stopPropagation();
      });

      // setTimeout(() => {
      //   this.querySelectorAll('*').forEach(element => {
      //     if (element.onDependenciesRequest && typeof element.onDependenciesRequest == "function") {
      //       element.onDependenciesRequest();
      //     }
      //   });
      // }, 3000);
    }
  };
};
