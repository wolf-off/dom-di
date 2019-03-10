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

# Send data between controls

  1. Inherit both your control from `diObjectMixin` (`/src/diObjectMixin.js`)
    
    `class MyControl extends diContainerMixin(HTMLElement) `
    `class MyControl extends diObjectMixinBabel(React.Component)`
    `class MyControl extends diObjectMixinBabel({})`

    If your control is some framework's control, realize `dispatchEvent` method to send events to DOM

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

