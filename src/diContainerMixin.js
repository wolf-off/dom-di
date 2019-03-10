window.di_global_container = new diContainer();

window.addEventListener('dom-di-request', (event) => {
  const request = event.detail.request;
  di_global_container.addRequest(request);
  event.preventDefault();
  event.stopPropagation();
});

window.addEventListener('dom-di-instance', (event) => {
  const type = event.detail.type;
  const instance = event.detail.instance;
  di_global_container.registerInstance(type, instance);
  event.preventDefault();
  event.stopPropagation();
});

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

      this.subscribers=[];
      this.events_unprocessed=[];
      this.events=[];
      this.addEventListener('dom-di-subscribe', (event) => {
        const type = event.detail.type;
        const callback = event.detail.callback;
        this.subscribers.push({type,callback});
        this.events.forEach(e=>{ //switch to unprocessed;
          if(e.type==type){
            callback(e.data,e.type);
          }
        });
      });    
      this.addEventListener('dom-di-event', (inEvent) => {
        const type = inEvent.detail.type;
        const data = inEvent.detail.data;
        const event={type,data};
        this.events.push(event);
        var unprocessed=true;
        this.subscribers.forEach(s=>{
          if(s.type==type){
            unprocessed=false;
            s.callback(data,type);
          }
        });
        if(unprocessed){
          this.unprocessed.push(event);
        }
      });    
    }
  };
};
