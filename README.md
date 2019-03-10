# DOM-DI Project

  Site of project:  [dom-di.org](http://dom-di.org)

  Target of DOM-DI is support your frontend by low coupling.
  It allow you to implement Interaction and Dependency Injection between your component via DOM
  There are two main dirrection of usage:
  1. In Web-components
  2. When you works with differents frameworks in one application (Angulars/React/Vue)

  Anyway It allows you work in [Micro Frontend](https://micro-frontends.org/) approach

## Install
```
npm install dom-di
```

All you need is in src folder

Add
```
  <script src="../src/diContainer.js"></script>
  <script src="../src/diContainerMixin.js"></script>
  <script src="../src/diObjectMixin.js"></script>
```

# Send data between controls

  1. Inherit both your control from `diObjectMixin` (`/src/diObjectMixin.js`)
    
    `class MyControl extends diContainerMixin(HTMLElement) `

    See [Frameworks](# Frameworks) section for framefork's specific information

  2. call diSubscribe to receive data
```
    this.diSubscribe((data) => {
        //use your data
    });
```
  3. call diSend to send data

```
    this.diSend(data);
```

# Simple Dependency Injection


## Provide Control

  1. Inherit your control from `diObjectMixin` (`/src/diObjectMixin.js`)
  2. Add
```
      this.typeName = 'control-to-provide';
```

## Receive Control
  1. Inherit your control from `diObjectMixin` (`/src/diObjectMixin.js`)
  2. Add
```
      this.dependencies = ['control-to-provide'];
      this.diReady = (control) => {
        // add your code
      }
```

  If you have done well, diReady will be called with the control in parameters


# Localize conversation

  There are two way to localize conversation between your components:
  1. Add `dom-di-container` (`/src/Controls/Container.html`)
    Sure that all partisipants of conversation is child of the control ( may be not direct) 
  2. Or inherit one parent control from `diContainerMixin` (`/src/diContainerMixin.js`)

  It allows you to not share events/injection outside container

# Frameworks
    To use dom-di you should
1. Inherit your component from `diObjectMixin` (`/src/diObjectMixin.js`)
2. Implement `dispatchEvent` method to send events to DOM

    It depends on frameworks:
1. [AngularJS](##AngularJS)
2. [Angular](##Angular)
3. [React](##React)
4. [Vue](##Vue)

    If your control is some framework's control, realize `dispatchEvent` method to send events to DOM

##AngularJS
```
myCtr = function ($element) {
  return new (diObjectMixin(function () {

    .
    .
    .

    this.dispatchEvent = (event) => {
      $element[0].dispatchEvent(event);
    }
  }))();
};
```

##Angular
```
export class AppComponent extends diObjectMixin(Object) {

  constructor(private elRef: ElementRef) {
    super();
  }

  .
  .
  .

  dispatchEvent(event) {
    this.elRef.nativeElement.dispatchEvent(event);
  }
}
```
##React
    ..not complited in case of low react knoledge, but it is works for me

```
class Hello extends diObjectMixinBabel(React.Component) {
    .
    .
    .
  dispatchEvent(event) {
    if (this.nv) {
      this.nv.dispatchEvent(event);
    } else {
      if (!this.nvQueue) {
        this.nvQueue = [];
      }
      this.nvQueue.push(event);
    }
  }

  componentDidMount() {
    if (this.nvQueue) {
      this.nvQueue.forEach(e => this.dispatchEvent(e));
      this.nvQueue = null;
    }
  }    
}
```
##Vue
    ..not complited in case of low vue knoledge, but it is possible

