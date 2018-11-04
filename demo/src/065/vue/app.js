
Vue.component('vue-component', {
  data: function () {
    return {
      typeName: 'service-e',
      dependencies: ['service-d'],
      serviceD: null
    }
  },
  methods: {
    onDependenciesRequest: function () {
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
    },
    onDependenciesReady: function (...instances) {
      const instance = this.diReady(...instances);
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
    },
    sayHello: function () {
      return 'E knows that D sais: ' + this.serviceD.sayHello();
    },
    diReady: function (serviceD) {
      this.serviceD = serviceD;
      return this;
    }
  },
  created: function () {
    setTimeout(() => {
      this.onDependenciesRequest();
    }, 200);
    if (!this.dispatchEvent) {
      this.dispatchEvent = (event) => {
        this.$refs.vueComponentRoot.dispatchEvent(event);
      }
    }
  },
  template: "<div ref='vueComponentRoot' style='display:block;border:solid black 1px;background:aquamarine;margin:5px'><div>Service E control</div></div>"
})

var app = new Vue({
  el: '#app',
  data: {}
})