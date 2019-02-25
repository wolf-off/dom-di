myCtr = function ($element) {
  var result = diObjectMixin(function AngComponentController() {
    this.typeName = 'service-d';
    this.dependencies = ['service-c'];
    this.diReady = (serviceC) => {
      this.serviceC = serviceC;
      return this;
    }
    this.sayHello = () => {
      return 'D knows that C sais: ' + this.serviceC.sayHello();
    }
    this.dispatchEvent = (event) => {
      $element[0].dispatchEvent(event);
    }
  });
  return new result();
};

var myApp = angular.module('angApp', []);
myApp.controller('angCtrl', ['$element', myCtr]);
myApp.component('angComponent', {
  template:
    `<div style='display:block;border:solid black 1px;background:aquamarine;margin:5px'>
        <div>Service D control</div>
      </div>`,
  controller: 'angCtrl'
});