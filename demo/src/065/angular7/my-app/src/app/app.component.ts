import { Component, ElementRef } from '@angular/core';
var diObjectMixin = (<any>window).diObjectMixin;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends diObjectMixin(Object) {

  constructor(private elRef: ElementRef) {
    super();
  }

  typeName = 'service-b';
  dependencies = ['service-a'];
  diReady(serviceA) {
    this.serviceA = serviceA;
    return this;
  }

  sayHello() {
    return 'B knows that A sais: ' + this.serviceA.sayHello();
  }

  dispatchEvent(event) {
    this.elRef.nativeElement.dispatchEvent(event);
  }
}
