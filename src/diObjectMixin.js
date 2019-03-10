
diObjectMixin = (superClass) => {
  return class Provider extends superClass {

    //need 'dependencies' is specified like array of strings
    //need 'typeName' is specified like string
    //need 'diReady' is specified like function

    constructor() {
      super();
      setTimeout(() => {
        this.onDependenciesRequest();
      }, 200);
      // if (!this.dispatchEvent) {
      //   this.dispatchEvent = (event) => this.elRef.nativeElement.dispatchEvent(event);
      // }
    }

    onDependenciesRequest() {
      if (this.dependencies && this.dependencies.length > 0) {
        var config = new diRequestParameters();
        this.dependencies.forEach(dependency => {
          config.requirements.push(dependency);
        });
        config.onReady = (...instances) => { this.onDependenciesReady(...instances); };
        var request = new diRequest(config);
        const event = new CustomEvent('dom-di-request', {
          detail: {
            request
          },
          bubbles: true,
          cancelable: true,
          composed: true
        });
        this.dispatchEvent(event);

      } else {
        this.onDependenciesReady();
      }
    }

    onDependenciesReady(...instances) {
      let instance;
      if (this.diReady && typeof (this.diReady) === "function") {
        instance = this.diReady(...instances); //Todo check result
      } else {
        instance = this;
      }
      if (this.typeName) {
        const event = new CustomEvent('dom-di-instance', {
          detail: {
            type: this.typeName,
            instance
          },
          bubbles: true,
          cancelable: true,
          composed: true
        });
        this.dispatchEvent(event);
      }
    }

    diSend(data, type) {
      const event = new CustomEvent('dom-di-event', {
        detail: {
          type,
          data
        },
        bubbles: true,
        cancelable: true,
        composed: true
      });
      this.dispatchEvent(event);
    }

    diSubscribe(callback, type) {
      const event = new CustomEvent('dom-di-subscribe', {
        detail: {
          type,
          callback
        },
        bubbles: true,
        cancelable: true,
        composed: true
      });
      this.dispatchEvent(event);
    }

  };
};
